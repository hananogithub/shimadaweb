# デプロイメントガイド

## 自動デプロイ設定

このリポジトリには以下のGitHub Actionsワークフローが設定されています：

### 1. 自動デプロイ (`deploy.yml`)
- **トリガー**: `main`ブランチへのプッシュ時
- **動作**: コードがプッシュされると自動的にデプロイが実行されます

### 2. 手動デプロイ (`manual-deploy.yml`)
- **トリガー**: GitHub Actions の "Run workflow" ボタンから手動実行
- **環境選択**: 本番環境またはステージング環境を選択可能

## デプロイ手順

### 方法1: 自動デプロイ（推奨）
1. ローカルで変更をコミット
2. `git push origin main` でプッシュ
3. GitHub Actionsが自動的にデプロイを実行

### 方法2: 手動デプロイ
1. GitHubリポジトリの "Actions" タブに移動
2. "Manual Deploy to shimadaweb.online" ワークフローを選択
3. "Run workflow" ボタンをクリック
4. 環境を選択して実行

### 方法3: サーバーで直接クローン
```bash
# サーバー上で実行
git clone https://github.com/hananogithub/shimadaweb.git
cd shimadaweb
# 必要に応じてファイルをWebサーバーのディレクトリにコピー
```

## 現在の設定

- **メール送信先**: `info@shimadaweb.online`
- **PHPファイル**: `contact.php` でメール送信処理
- **フォーム**: `index.html` のJavaScriptでPHPファイルを呼び出し

## 注意事項

- サーバーでPHPが有効になっていることを確認してください
- メール送信機能（`mb_send_mail`）が有効になっていることを確認してください
- 必要に応じてSMTP設定を行ってください

## トラブルシューティング

メールが送信されない場合：
1. サーバーのPHP設定を確認
2. メール送信機能が有効か確認
3. SMTP設定を確認
4. エラーログを確認
