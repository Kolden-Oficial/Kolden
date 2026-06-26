<#
.SYNOPSIS
  Ponte do Hermes (orquestrador máximo) para os squads da Kolden.

.DESCRIPTION
  Resolve um squad no catálogo (squads-catalog.yaml), faz o Claude Code headless
  adotar a persona do chief daquele squad e devolve a resposta no stdout.

  É a única lógica de shell-out da camada Hermes-chief. O Hermes chama este script
  pela sua ferramenta `terminal`.

.PARAMETER Squad
  Id do squad no catálogo (ex.: peitho).

.PARAMETER Prompt
  O pedido a ser atendido pelo chief do squad.

.PARAMETER Catalog
  Caminho do catálogo. Default: ..\squads-catalog.yaml relativo a este script.

.PARAMETER Model
  Modelo opcional a passar para `claude` (--model).

.PARAMETER Approved
  Libera ações que mudam o mundo para squads com `muda_algo: true`. SEM esta flag,
  o script força o chief a operar em MODO SOMENTE-DIAGNÓSTICO (lê/analisa/relata, mas
  é proibido de executar ação externa). O Hermes só deve passar -Approved depois de
  um "ok" explícito do Ronan. É a trava de segurança no nível do script — não depende
  da "vontade" do modelo orquestrador.

.PARAMETER DryRun
  Mostra o comando/prompt resolvido sem executar.

.EXAMPLE
  powershell -File invoca-squad.ps1 -Squad peitho -Prompt "ROAS caindo no Google Ads, o que fazer?"

.EXAMPLE
  # Diagnóstico (sem aprovação) — seguro, não muda nada:
  powershell -File invoca-squad.ps1 -Squad peitho -Prompt "ROAS caindo, analise"
  # Após o "ok" do Ronan, libera ação:
  powershell -File invoca-squad.ps1 -Squad peitho -Prompt "pause os ad groups com ROAS<1" -Approved
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)] [string] $Squad,
    [Parameter(Mandatory = $true)] [string] $Prompt,
    [string] $Catalog,
    [string] $Model,
    [switch] $Approved,
    [switch] $DryRun
)

$ErrorActionPreference = 'Stop'

if (-not $Catalog) {
    $Catalog = Join-Path $PSScriptRoot '..\squads-catalog.yaml'
}
if (-not (Test-Path $Catalog)) {
    Write-Error "Catálogo não encontrado: $Catalog"
    exit 2
}

# --- Parser mínimo do catálogo (PS 5.1 não tem YAML nativo) -----------------
# Extrai dir/tipo/chief_file do bloco do squad pedido. Formato esperado:
#   squads:
#     - squad: <id>
#       dir: "<path>"
#       tipo: <aios|claude-code>
#       chief_file: "<rel>"
function Get-SquadEntry {
    param([string] $Path, [string] $Id)

    $lines = Get-Content -LiteralPath $Path -Encoding UTF8
    $inBlock = $false
    $entry = @{ squad = $null; dir = $null; tipo = $null; chief_file = $null; muda_algo = $null }

    function Clean([string] $v) {
        # remove comentário inline, espaços e aspas
        $v = ($v -replace '\s+#.*$', '').Trim()
        $v = $v.Trim('"').Trim("'")
        return $v
    }

    foreach ($line in $lines) {
        $trim = $line.Trim()
        if ($trim -match '^-\s*squad:\s*(.+)$') {
            $thisId = Clean $Matches[1]
            if ($inBlock) { break }          # acabou o bloco do nosso squad
            if ($thisId -eq $Id) {
                $inBlock = $true
                $entry.squad = $thisId
            }
            continue
        }
        if ($inBlock) {
            if ($trim -match '^dir:\s*(.+)$')        { $entry.dir = Clean $Matches[1] }
            elseif ($trim -match '^tipo:\s*(.+)$')        { $entry.tipo = Clean $Matches[1] }
            elseif ($trim -match '^chief_file:\s*(.+)$')  { $entry.chief_file = Clean $Matches[1] }
            elseif ($trim -match '^muda_algo:\s*(.+)$')   { $entry.muda_algo = Clean $Matches[1] }
        }
    }
    if (-not $entry.squad) { return $null }
    return $entry
}

$e = Get-SquadEntry -Path $Catalog -Id $Squad
if (-not $e) {
    Write-Error "Squad '$Squad' não está no catálogo ($Catalog)."
    exit 3
}
if (-not $e.dir -or -not (Test-Path $e.dir)) {
    Write-Error "Diretório do squad '$Squad' inválido: '$($e.dir)'."
    exit 4
}

$chiefPath = Join-Path $e.dir $e.chief_file
if (-not (Test-Path $chiefPath)) {
    Write-Error "Arquivo do chief não encontrado: $chiefPath"
    exit 5
}

# --- Monta o prompt de ativação conforme o tipo ----------------------------
switch ($e.tipo) {
    'aios' {
        $activation = @"
Opere como o agente definido em "$($e.chief_file)": leia esse arquivo, adote integralmente a persona e siga as instruções de ativação (bloco AVISO-DE-ATIVAÇÃO). Depois, atenda ao pedido abaixo como esse agente. Responda em PT-BR.

PEDIDO:
$Prompt
"@
    }
    'claude-code' {
        # Só funciona se o squad registrar o chief como subagente nativo em
        # .claude/agents/<chief>.md. Caso contrário (ex.: .claude/ só tem skills),
        # cai no read-and-adopt do chief_file — o mesmo modo robusto do tipo aios.
        $chiefName = [System.IO.Path]::GetFileNameWithoutExtension($e.chief_file)
        $subagentPath = Join-Path $e.dir (Join-Path '.claude/agents' "$chiefName.md")
        if (Test-Path $subagentPath) {
            $activation = "Use o subagente @$chiefName para atender, em PT-BR: $Prompt"
        }
        else {
            Write-Verbose "Sem subagente nativo em $subagentPath; usando read-and-adopt do chief_file."
            $activation = @"
Opere como o agente definido em "$($e.chief_file)": leia esse arquivo, adote integralmente a persona e siga as instruções de ativação (bloco AVISO-DE-ATIVAÇÃO). Depois, atenda ao pedido abaixo como esse agente. Responda em PT-BR.

PEDIDO:
$Prompt
"@
        }
    }
    default {
        Write-Error "tipo desconhecido para '$Squad': '$($e.tipo)'. Use aios ou claude-code."
        exit 6
    }
}

# --- Gate muda_algo: trava de segurança no nível do script ------------------
# Para squads com muda_algo: true, SEM -Approved o chief é constrangido a um modo
# somente-diagnóstico (defense-in-depth real, não depende do orquestrador lembrar
# de pedir aprovação). COM -Approved (após "ok" do Ronan), a ação é liberada.
$mudaAlgo = ($e.muda_algo -eq 'true')
if ($mudaAlgo -and -not $Approved) {
    $gate = @"
MODO SOMENTE-DIAGNÓSTICO (aprovação do Ronan NÃO concedida).
Você está PROIBIDO de executar qualquer ação que mude o mundo externo: subir/pausar/editar
campanhas, alterar orçamento/lances, publicar, enviar mensagens, gastar verba, gravar em
sistemas de terceiros ou mexer em dados externos. Apenas LEIA, ANALISE e RELATE.
Se ação for necessária, LISTE exatamente o que faria (passos concretos) e PARE — não execute.

"@
    $activation = $gate + $activation
}
elseif ($mudaAlgo -and $Approved) {
    $gate = @"
AÇÃO AUTORIZADA pelo Ronan para este pedido. Você pode executar as ações que mudam o mundo
descritas no pedido, com cuidado e reportando cada passo. Mantenha-se no escopo do pedido.

"@
    $activation = $gate + $activation
}

# --- Argumentos do claude headless -----------------------------------------
$claudeArgs = @('-p', $activation)
if ($Model) { $claudeArgs += @('--model', $Model) }

if ($DryRun) {
    Write-Host "── DRY RUN ─────────────────────────────────────────"
    Write-Host "squad      : $($e.squad)"
    Write-Host "dir (cwd)  : $($e.dir)"
    Write-Host "tipo       : $($e.tipo)"
    Write-Host "chief_file : $($e.chief_file)"
    Write-Host "muda_algo  : $($e.muda_algo)"
    Write-Host "modo       : $(if($mudaAlgo -and -not $Approved){'SOMENTE-DIAGNOSTICO (sem -Approved)'}elseif($mudaAlgo){'ACAO AUTORIZADA (-Approved)'}else{'normal (muda_algo:false)'})"
    Write-Host "comando    : claude -p <activation>$(if($Model){" --model $Model"})"
    Write-Host "─── activation ─────────────────────────────────────"
    Write-Host $activation
    exit 0
}

# --- Executa no diretório do squad -----------------------------------------
Push-Location $e.dir
try {
    # stdin vazio: o `claude -p` recebe o prompt por arg; fechar o stdin evita
    # a espera de ~3s por entrada (importante em cron/background).
    $null | & claude @claudeArgs
    $code = $LASTEXITCODE
}
finally {
    Pop-Location
}
exit $code
