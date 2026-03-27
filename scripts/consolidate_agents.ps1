# Consolidar todas as pastas de agents em uma única pasta compartilhada usando Junctions
$sharedPath = Join-Path (Get-Location) ".shared-agents"
if (-not (Test-Path $sharedPath)) {
    New-Item -ItemType Directory -Path $sharedPath -Force | Out-Null
}

$toolFolders = @(
    ".agent", ".agents", ".claude", ".codebuddy", ".codex", ".continue",
    ".cursor", ".gemini", ".kiro", ".opencode", ".qoder", ".roo", ".trae", ".windsurf"
)

foreach ($folder in $toolFolders) {
    $agentDir = Join-Path (Get-Location) "$folder\agents"
    if (Test-Path $agentDir) {
        Get-ChildItem -Path $agentDir -File | ForEach-Object {
            $destPath = Join-Path $sharedPath $_.Name
            if (-not (Test-Path $destPath)) {
                Copy-Item -Path $_.FullName -Destination $destPath -Force
            }
        }
    }
}

foreach ($folder in $toolFolders) {
    $agentDir = Join-Path (Get-Location) "$folder\agents"
    if (Test-Path $agentDir) {
        $attributes = (Get-Item $agentDir).Attributes
        if ($attributes -notmatch "ReparsePoint") {
            Remove-Item -Path $agentDir -Recurse -Force
            cmd /c mklink /j "$agentDir" "$sharedPath"
        }
    } else {
        $parentFolder = Join-Path (Get-Location) $folder
        if (Test-Path $parentFolder) {
            cmd /c mklink /j "$agentDir" "$sharedPath"
        }
    }
}
