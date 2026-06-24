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

.PARAMETER DryRun
  Mostra o comando/prompt resolvido sem executar.

.EXAMPLE
  powershell -File invoca-squad.ps1 -Squad peitho -Prompt "ROAS caindo no Google Ads, o que fazer?"
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)] [string] $Squad,
    [Parameter(Mandatory = $true)] [string] $Prompt,
    [string] $Catalog,
    [string] $Model,
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
    $entry = @{ squad = $null; dir = $null; tipo = $null; chief_file = $null }

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
        $chiefName = [System.IO.Path]::GetFileNameWithoutExtension($e.chief_file)
        $activation = "Use o subagente @$chiefName para atender, em PT-BR: $Prompt"
    }
    default {
        Write-Error "tipo desconhecido para '$Squad': '$($e.tipo)'. Use aios ou claude-code."
        exit 6
    }
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
