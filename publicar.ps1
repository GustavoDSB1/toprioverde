# Publica o site no Cloudflare Pages (https://toprioverde.pages.dev)
# Envia SOMENTE os arquivos públicos do site — nada de configs, scripts ou arquivos locais.
# Uso:  powershell -ExecutionPolicy Bypass -File .\publicar.ps1

$ErrorActionPreference = "Stop"
$origem  = $PSScriptRoot
$destino = Join-Path $env:TEMP "toprioverde-deploy"

# Lista explícita do que vai para a internet (allowlist)
$arquivos = @("index.html", "styles.css", "script.js", "_headers", "assets")

if (Test-Path $destino) { Remove-Item $destino -Recurse -Force }
$destino = (New-Item -ItemType Directory $destino).FullName
foreach ($a in $arquivos) { Copy-Item (Join-Path $origem $a) $destino -Recurse }

Write-Host "Arquivos que serao publicados:" -ForegroundColor Cyan
Get-ChildItem $destino -Recurse -File | ForEach-Object { "  " + $_.FullName.Substring($destino.Length + 1) }

npx --yes wrangler@4 pages deploy $destino --project-name toprioverde --branch main --commit-dirty=true
Remove-Item $destino -Recurse -Force
