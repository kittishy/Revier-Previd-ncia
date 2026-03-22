param(
    [Parameter(Mandatory = $true)]
    [string]$Message,

    [switch]$Prod
)

$ErrorActionPreference = "Stop"

function Run-Step {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Command
    )

    Write-Host ">> $Command" -ForegroundColor Cyan
    Invoke-Expression $Command
}

$branch = (git branch --show-current).Trim()
if (-not $branch) {
    throw "Nao foi possivel identificar o branch atual."
}

Run-Step "git add -A"

$status = git status --short
if (-not $status) {
    Write-Host "Nada para commitar." -ForegroundColor Yellow
} else {
    Run-Step "git commit -m `"$Message`""
}

Run-Step "git pull --rebase origin $branch"
Run-Step "git push origin $branch"

if ($Prod) {
    Run-Step "vercel deploy --prod -y"
} else {
    Run-Step "vercel deploy -y"
}
