param(
    [Parameter(Mandatory = $true)]
    [string]$Message,

    [switch]$Preview,

    [string]$Project = "revier-portal",

    [string]$Scope = "julia-santinis-projects"
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
Run-Step "vercel link --yes --project $Project --scope $Scope"

if ($Preview) {
    Run-Step "vercel deploy -y"
} else {
    Run-Step "vercel deploy --prod -y"
}
