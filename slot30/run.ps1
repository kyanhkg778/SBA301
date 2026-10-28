# Script chạy nhanh ứng dụng có tự động nạp file .env và nạp Maven/Java 21
if (Test-Path "$PSScriptRoot\.env") {
    Get-Content "$PSScriptRoot\.env" | Where-Object { $_ -match '^\s*([^#=]+)\s*=\s*(.*)$' } | ForEach-Object {
        $key = $matches[1].Trim()
        $val = $matches[2].Trim()
        [Environment]::SetEnvironmentVariable($key, $val, 'Process')
    }
}

$mavenBin = "D:\IntelliJ IDEA 2025.3.1\plugins\maven\lib\maven3\bin"
$javaBin = "C:\Program Files\Java\jdk-21.0.12\bin"
if ($env:Path -notlike "*$mavenBin*") { $env:Path = "$mavenBin;$env:Path" }
if ($env:Path -notlike "*$javaBin*") { $env:Path = "$javaBin;$env:Path" }
$env:JAVA_HOME = "C:\Program Files\Java\jdk-21.0.12"

mvn spring-boot:run
