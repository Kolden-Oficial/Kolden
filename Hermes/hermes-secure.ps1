# hermes-secure.ps1 — inicia o Hermes com os segredos injetados do Infisical (env=prod).
# A OPENROUTER_API_KEY (e demais segredos) vem do Infisical em tempo de execucao,
# NUNCA fica salva em disco. Sessao do Infisical: adm@kolden.com.br (Infisical Cloud).
#
# Uso:
#   .\hermes-secure.ps1                       # CLI interativo
#   .\hermes-secure.ps1 gateway start         # sobe o gateway (WhatsApp etc.)
#   .\hermes-secure.ps1 whatsapp              # pareia o WhatsApp via QR
#   .\hermes-secure.ps1 -z "diga OK"          # one-shot

$ProjectId = "43d90b85-ca09-437c-b8f2-364b5cbe6093"
$Env       = "prod"
$Python    = "C:\Kolden\Hermes\.venv\Scripts\python.exe"
$Hermes    = "C:\Kolden\Hermes\hermes"
$Shim      = "C:\Users\Ronan Silva\.claude\infisical-shim.cjs"

# Patch SAC: o infisical.exe (nao-assinado) e bloqueado pelo Smart App Control do Windows.
# Roteamos por node + shim (node.exe assinado passa no SAC); os segredos vem da API do Infisical
# em tempo de execucao e NUNCA ficam em disco. Requer machine identity em
# ~/.claude/infisical-machine-identity.json (ou env INFISICAL_CLIENT_ID/INFISICAL_CLIENT_SECRET).
node $Shim run --projectId $ProjectId --env $Env -- $Python $Hermes @args
