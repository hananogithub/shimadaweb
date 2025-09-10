# 📧 Formspreeスパム設定ガイド

## スパムメールも受信する設定方法

### 1. Formspreeダッシュボードでの設定

#### ステップ1: Formspreeにログイン
1. [https://formspree.io/](https://formspree.io/) にアクセス
2. アカウントにログイン
3. フォーム一覧から `movnrwrd` を選択

#### ステップ2: スパム設定を変更
1. **Settings** タブをクリック
2. **Spam Protection** セクションを探す
3. 以下の設定を変更：

```
✅ Enable spam protection: OFF（無効にする）
```

または

```
✅ Send spam to email: ON（スパムもメールで送信）
```

### 2. メール設定の確認

#### 送信先メールアドレスの設定
1. **Email** タブをクリック
2. **Send to** セクションで以下を確認：
   - メールアドレス: `info@shimadaweb.online`
   - または適切なメールアドレス

#### 通知設定
1. **Notifications** セクションで：
   - ✅ Email notifications: ON
   - ✅ Send all submissions: ON（すべての送信をメールで受信）

### 3. フィルタリング設定の調整

#### スパムフィルタを緩和
1. **Advanced** タブをクリック
2. **Spam Filtering** セクションで：
   - Spam sensitivity: Low（低感度に設定）
   - または完全に無効化

#### カスタムフィルタの設定
1. **Custom Rules** で以下を追加：
   ```
   Rule: Always send to email
   Condition: All submissions
   Action: Send email notification
   ```

### 4. 代替案：Webhookの使用

#### Webhook設定
1. **Integrations** タブをクリック
2. **Webhooks** を選択
3. 以下の設定を追加：
   - URL: `https://shimadaweb.online/webhook-handler.php`
   - Events: All submissions（すべての送信）

#### Webhookハンドラーの作成
```php
<?php
// webhook-handler.php
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// すべての送信をメールで転送
$to = 'info@shimadaweb.online';
$subject = '【Formspree】お問い合わせ - ' . $data['companyName'];
$message = "新しいお問い合わせが届きました。\n\n";
$message .= "会社名: " . $data['companyName'] . "\n";
$message .= "メール: " . $data['email'] . "\n";
$message .= "内容: " . $data['message'] . "\n";

mail($to, $subject, $message);
?>
```

### 5. フォーム設定の最適化

#### フォームにスパム対策を追加
```html
<!-- スパム対策用の隠しフィールド -->
<input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">

<!-- 送信先の明示 -->
<input type="hidden" name="_next" value="https://shimadaweb.online/thank-you.html">
<input type="hidden" name="_subject" value="【しまだWeb制作】お問い合わせ">
```

#### JavaScriptでの追加設定
```javascript
// フォーム送信時にスパム対策フィールドを設定
formData.append('_gotcha', ''); // 空の値でスパム対策
formData.append('_next', 'https://shimadaweb.online/thank-you.html');
formData.append('_subject', '【しまだWeb制作】お問い合わせ');
```

### 6. 確認方法

#### テスト送信
1. 正常なメールを送信
2. スパムと判定されそうな内容で送信
3. 両方とも `info@shimadaweb.online` に届くか確認

#### ログの確認
1. Formspreeダッシュボードで送信履歴を確認
2. スパムに分類されたメールも表示されるか確認
3. メール通知が正しく送信されているか確認

### 7. トラブルシューティング

#### スパムメールが届かない場合
1. **Formspree設定の確認**
   - スパム保護が無効になっているか
   - メール通知が有効になっているか

2. **メールサーバーの設定確認**
   - `info@shimadaweb.online` のメールボックスを確認
   - スパムフォルダもチェック

3. **フォーム設定の確認**
   - フォームIDが正しいか
   - 送信先メールアドレスが正しいか

#### メールが重複して届く場合
1. **通知設定の調整**
   - 重複する通知を無効化
   - 必要最小限の通知のみ有効化

### 8. 推奨設定

#### 最適な設定
```
✅ Spam Protection: OFF
✅ Email Notifications: ON
✅ Send All Submissions: ON
✅ Spam Sensitivity: Low
✅ Custom Rules: Always send to email
```

#### メールアドレスの設定
- 送信先: `info@shimadaweb.online`
- 送信者: `noreply@shimadaweb.online`
- 件名: `【しまだWeb制作】お問い合わせ`

これで、スパムに分類されるメールも含めて、すべてのメールが `shimadaweb.online` に送信されるようになります。
