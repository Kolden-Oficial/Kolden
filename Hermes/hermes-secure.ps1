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

infisical run --projectId $ProjectId --env $Env -- $Python $Hermes @args
