<?php
// エラーレポートを有効にする（本番環境では無効にする）
error_reporting(E_ALL);
ini_set('display_errors', 1);

// 日本語メール送信のための文字エンコーディング設定
mb_language('Japanese');
mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');

// 送信先メールアドレス
$to = 'info@shimadaweb.online';

// 送信者情報（フォームから取得）
$companyName = isset($_POST['companyName']) ? trim($_POST['companyName']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$service = isset($_POST['service']) ? trim($_POST['service']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';
$privacy = isset($_POST['privacy']) ? $_POST['privacy'] : '';

// バリデーション
$errors = [];

if (empty($companyName)) {
    $errors[] = '会社名・お名前は必須です。';
}

if (empty($email)) {
    $errors[] = 'メールアドレスは必須です。';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = '有効なメールアドレスを入力してください。';
}

if (empty($message)) {
    $errors[] = 'お問い合わせ内容は必須です。';
}

if (empty($privacy)) {
    $errors[] = 'プライバシーポリシーに同意してください。';
}

// エラーがある場合はJSONで返す
if (!empty($errors)) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => false,
        'errors' => $errors
    ]);
    exit;
}

// サービス名の変換
$serviceNames = [
    'light' => 'ライトプラン（15万円〜）',
    'standard' => 'スタンダードプラン（50万円〜）',
    'premium' => 'プレミアムプラン（80万円〜）',
    'maintenance' => '保守・運用（月額1万円〜）',
    'consultation' => '無料相談のみ'
];

$serviceName = isset($serviceNames[$service]) ? $serviceNames[$service] : $service;

// メール件名
$subject = '【しまだWeb制作】お問い合わせ - ' . $companyName;

// メール本文
$body = "しまだWeb制作にお問い合わせいただき、ありがとうございます。\n\n";
$body .= "以下の内容でお問い合わせを受け付けました。\n";
$body .= "1営業日以内にご返信いたします。\n\n";
$body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$body .= "【お問い合わせ内容】\n";
$body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
$body .= "■ 会社名・お名前\n";
$body .= $companyName . "\n\n";
$body .= "■ メールアドレス\n";
$body .= $email . "\n\n";
$body .= "■ 電話番号\n";
$body .= $phone ? $phone : "未入力\n\n";
$body .= "■ ご希望のサービス\n";
$body .= $serviceName . "\n\n";
$body .= "■ お問い合わせ内容\n";
$body .= $message . "\n\n";
$body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$body .= "送信日時: " . date('Y年m月d日 H:i:s') . "\n";
$body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
$body .= "しまだWeb制作\n";
$body .= "〒427-0105 静岡県島田市南原260-1\n";
$body .= "TEL: 080-9525-5817\n";
$body .= "E-mail: info@shimadaweb.online\n";
$body .= "https://shimadaweb.online\n";

// メールヘッダー
$headers = [
    'From' => 'noreply@shimadaweb.online',
    'Reply-To' => $email,
    'X-Mailer' => 'PHP/' . phpversion(),
    'Content-Type' => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => '8bit'
];

// ヘッダーを文字列に変換
$headerString = '';
foreach ($headers as $key => $value) {
    $headerString .= $key . ': ' . $value . "\r\n";
}

// メール送信
$mailSent = mb_send_mail($to, $subject, $body, $headerString);

// 管理者への通知メール
$adminSubject = '【新規お問い合わせ】' . $companyName . ' 様';
$adminBody = "新しいお問い合わせが届きました。\n\n" . $body;

$adminHeaders = [
    'From' => 'noreply@shimadaweb.online',
    'X-Mailer' => 'PHP/' . phpversion(),
    'Content-Type' => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => '8bit'
];

$adminHeaderString = '';
foreach ($adminHeaders as $key => $value) {
    $adminHeaderString .= $key . ': ' . $value . "\r\n";
}

$adminMailSent = mb_send_mail($to, $adminSubject, $adminBody, $adminHeaderString);

// レスポンス
header('Content-Type: application/json; charset=utf-8');

if ($mailSent && $adminMailSent) {
    echo json_encode([
        'success' => true,
        'message' => 'お問い合わせありがとうございます。1営業日以内にご返信いたします。'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => '送信に失敗しました。しばらく時間をおいて再度お試しください。'
    ]);
}
?>
