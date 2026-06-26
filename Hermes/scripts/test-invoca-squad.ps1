<#
.SYNOPSIS
  Suite de testes do invoca-squad.ps1 (parser, gate muda_algo, resolucao de rotas).
.DESCRIPTION
  Usa -DryRun (nao executa claude). Invoca o script como SUBPROCESSO (powershell -File),
  espelhando o uso real do Hermes e isolando o exit/Write-Error do script-alvo. Args
  como linha de comando (switches -DryRun/-Approved parseados nativamente). Comparacoes
  em ASCII puro para robustez a encoding. Sai != 0 se algo falhar.
.EXAMPLE
  powershell -File C:\Kolden\Hermes\scripts\test-invoca-squad.ps1
#>
[CmdletBinding()]
param()

$ErrorActionPreference = 'Continue'
$target = Join-Path $PSScriptRoot 'invoca-squad.ps1'
$pass = 0
$fail = 0

function Check([string] $name, [bool] $ok) {
    if ($ok) { $script:pass++; Write-Host ("  PASS  " + $name) }
    else     { $script:fail++; Write-Host ("  FAIL  " + $name) -ForegroundColor Red }
}

function Run([string[]] $cliArgs) {
    # Subprocesso: o exit N e o Write-Error do alvo ficam isolados; pegamos o exit
    # code via $LASTEXITCODE. Args repassados como linha de comando (switches OK).
    $global:LASTEXITCODE = 0
    & powershell -NoProfile -File $target @cliArgs *>&1 | Out-String
}

Write-Host "== 1. Squad inexistente retorna erro =="
$null = Run @('-Squad','naoexiste','-Prompt','x','-DryRun')
Check "squad inexistente -> exit != 0" ($LASTEXITCODE -ne 0)

Write-Host "== 2. Todos os squads do catalogo resolvem (DryRun exit 0) =="
$squads = @('peitho','argos','liceu','pheme','caliope','aglaia','orfeu','aletheia',
            'olimpo','themis','metis','pluto','dionisio','dedalo','egide')
foreach ($s in $squads) {
    $null = Run @('-Squad',$s,'-Prompt','teste','-DryRun')
    Check ("resolve $s") ($LASTEXITCODE -eq 0)
}

Write-Host "== 3. Gate: muda_algo:true SEM -Approved forca diagnostico =="
$o = Run @('-Squad','peitho','-Prompt','pause campanha','-DryRun')
Check "peitho sem -Approved contem SOMENTE-DIAGN" ([bool]($o -match 'SOMENTE-DIAGN'))
Check "peitho sem -Approved NAO contem AUTORIZADA" (-not [bool]($o -match 'AUTORIZADA'))

Write-Host "== 4. Gate: muda_algo:true COM -Approved libera acao =="
$o = Run @('-Squad','peitho','-Prompt','pause campanha','-Approved','-DryRun')
Check "peitho -Approved contem AUTORIZADA" ([bool]($o -match 'AUTORIZADA'))
Check "peitho -Approved NAO contem SOMENTE-DIAGN" (-not [bool]($o -match 'SOMENTE-DIAGN'))

Write-Host "== 5. muda_algo:false roda em modo normal =="
$o = Run @('-Squad','liceu','-Prompt','disseque uma mente','-DryRun')
Check "liceu modo normal" ([bool]($o -match 'normal \(muda_algo'))
Check "liceu NAO forca diagnostico" (-not [bool]($o -match 'SOMENTE-DIAGN'))

Write-Host ""
Write-Host ("RESULTADO: {0} pass / {1} fail" -f $pass, $fail)
if ($fail -gt 0) { exit 1 } else { exit 0 }
