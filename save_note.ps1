$headers = @{
    'Authorization' = 'gk_live_79b6b23b30fd7ce0.090fb84190fa180e7d90e1629665784efe6e77b8a42dc963'
    'X-Client-ID' = 'cli_3802f9db08b811f197679c63c078bacc'
}
$body = @{
    title = '今天学习 OpenClaw'
    content = '今天学习 OpenClaw'
    note_type = 'plain_text'
} | ConvertTo-Json -Compress

$response = Invoke-WebRequest -Uri 'https://openapi.biji.com/open/api/v1/resource/note/save' -Method Post -Headers $headers -Body $body -ContentType 'application/json'
$response.Content