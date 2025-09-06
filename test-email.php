<?php
// メール機能テストスクリプト
// 使用方法: php test-email.php

echo "📧 しまだWeb制作 - メール機能テスト\n";
echo "=====================================\n\n";

// テスト用のメール送信先
$to = 'info@shimadaweb.online';
$subject = '【テスト】メール送信機能の確認';
$message = "これはメール送信機能のテストメールです。\n\n";
$message .= "送信日時: " . date('Y年m月d日 H:i:s') . "\n";
$message .= "送信元: テストスクリプト\n\n";
$message .= "メールフォームが正常に動作していることを確認してください。\n\n";
$message .= "しまだWeb制作\n";
$message .= "〒427-0105 静岡県島田市南原260-1\n";
$message .= "TEL: 080-9525-5817\n";
$message .= "E-mail: info@shimadaweb.online\n";

// メールヘッダー
$headers = [
    'From' => 'noreply@shimadaweb.online',
    'Reply-To' => 'noreply@shimadaweb.online',
    'X-Mailer' => 'PHP/' . phpversion(),
    'Content-Type' => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => '8bit'
];

// ヘッダーを文字列に変換
$headerString = '';
foreach ($headers as $key => $value) {
    $headerString .= $key . ': ' . $value . "\r\n";
}

echo "📤 テストメールを送信中...\n";
echo "送信先: $to\n";
echo "件名: $subject\n\n";

// メール送信の実行
$mailSent = mb_send_mail($to, $subject, $message, $headerString);

if ($mailSent) {
    echo "✅ メール送信が成功しました！\n";
    echo "📬 info@shimadaweb.online にメールが届いているか確認してください。\n\n";
    
    // 送信内容の表示
    echo "📋 送信内容:\n";
    echo "----------------------------------------\n";
    echo "件名: $subject\n";
    echo "送信先: $to\n";
    echo "----------------------------------------\n";
    echo $message;
    echo "----------------------------------------\n\n";
    
    echo "🎉 メール機能は正常に動作しています！\n";
} else {
    echo "❌ メール送信に失敗しました。\n";
    echo "🔍 以下の点を確認してください：\n";
    echo "1. サーバーのメール送信機能が有効になっているか\n";
    echo "2. SMTP設定が正しく行われているか\n";
    echo "3. PHPのmb_send_mail関数が利用可能か\n";
    echo "4. サーバーのエラーログを確認\n\n";
    
    // エラー情報の表示
    echo "🔧 デバッグ情報:\n";
    echo "PHP Version: " . phpversion() . "\n";
    echo "mb_send_mail available: " . (function_exists('mb_send_mail') ? 'Yes' : 'No') . "\n";
    echo "mail function available: " . (function_exists('mail') ? 'Yes' : 'No') . "\n";
}

echo "\n=====================================\n";
echo "📧 メール機能テスト完了\n";
echo "=====================================\n";
?>
