# 🚀 しまだWeb制作 - 最終アップロード手順

## 📦 アップロード用ファイル
- **ZIPファイル**: `shimadaweb-upload.zip` (50.4KB)
- **作成日時**: 2025年9月10日 10:45

## 🎯 最新の変更内容

### ✅ Formspreeフォーム設定
- **フォームID**: `movnrwrd`
- **URL**: `https://formspree.io/f/movnrwrd`
- **スパム対策**: 隠しフィールド `_gotcha` を追加
- **お礼ページ**: `thank-you.html` を追加

### ✅ 含まれるファイル
- `index.html` - メインページ（Formspree対応）
- `script.js` - JavaScript（Formspree対応）
- `styles.css` - スタイルシート
- `thank-you.html` - お礼ページ（新規追加）
- `test-formspree.html` - テスト用フォーム
- `contact.php` - PHPファイル（参考用）
- `robots.txt` - 検索エンジン用
- `sitemap.xml` - サイトマップ
- `.htaccess` - Apache設定

## 📋 エックスサーバーでのアップロード手順

### ステップ1: ファイルマネージャーを開く
1. エックスサーバーの管理画面にログイン
2. サーバーパネル → ファイルマネージャー
3. ドメイン「shimadaweb.online」を選択
4. `public_html/` フォルダを開く

### ステップ2: 既存ファイルのバックアップ（推奨）
1. 既存のファイルを別フォルダにコピー
2. または既存ファイルを削除

### ステップ3: ZIPファイルをアップロード
1. `shimadaweb-upload.zip` をアップロード
2. アップロード完了を確認

### ステップ4: ZIPファイルを展開
1. `shimadaweb-upload.zip` を右クリック
2. 「展開」を選択
3. 展開先を `public_html/` に設定

### ステップ5: ファイルをルートに移動
1. 展開されたファイルをすべて `public_html/` に移動
2. サブディレクトリに残さない

### ステップ6: 不要なファイルを削除
1. `shimadaweb-upload.zip` を削除
2. 空のフォルダがあれば削除

## ✅ アップロード後の確認

### 1. サイトの表示確認
- **メインページ**: `https://shimadaweb.online/`
- **お礼ページ**: `https://shimadaweb.online/thank-you.html`
- **テストページ**: `https://shimadaweb.online/test-formspree.html`

### 2. フォーム送信のテスト
1. `https://shimadaweb.online/` でフォーム送信
2. お礼ページにリダイレクトされるか確認
3. Formspreeでメールが受信されるか確認

### 3. メール送信の確認
1. Formspreeダッシュボードで送信履歴を確認
2. 設定されたメールアドレスにメールが届くか確認

## 🔧 正しいファイル構造

```
public_html/
├── index.html              ← メインページ
├── script.js               ← JavaScript
├── styles.css              ← スタイルシート
├── thank-you.html          ← お礼ページ
├── test-formspree.html     ← テスト用フォーム
├── contact.php             ← PHPファイル（参考用）
├── robots.txt              ← 検索エンジン用
├── sitemap.xml             ← サイトマップ
└── .htaccess               ← Apache設定
```

## ⚠️ 重要な注意点

### ファイルの配置場所
- **必ず `public_html/` のルートに直接配置**
- サブディレクトリに配置しない
- ファイル名は正確に

### 権限設定
- ファイル: `644`
- ディレクトリ: `755`
- エックスサーバーでは自動設定される場合が多い

### Formspree設定
- フォームID: `movnrwrd`
- スパム保護を無効にする
- すべての送信をメールで受信する設定

## 🆘 トラブルシューティング

### サイトが表示されない場合
1. ファイルが `public_html/` に直接配置されているか確認
2. `index.html` の名前が正しいか確認
3. ブラウザのキャッシュをクリア

### フォームが動作しない場合
1. JavaScriptのコンソールエラーを確認
2. Formspreeの設定を確認
3. ネットワーク接続を確認

### メールが届かない場合
1. Formspreeダッシュボードで送信履歴を確認
2. スパム設定を確認
3. メールアドレスの設定を確認

## 📞 サポート

問題が発生した場合は、以下を確認してください：
1. エラーメッセージの内容
2. ブラウザのコンソールエラー
3. Formspreeの送信履歴

これで、最新のFormspreeフォーム設定が反映されたサイトがアップロードされます！
