#!/bin/bash

# しまだWeb制作 - サーバーデプロイスクリプト
# 使用方法: ./deploy-to-server.sh

echo "🚀 しまだWeb制作 - サーバーデプロイ開始"
echo "=================================="

# デプロイ先の設定
DEPLOY_DIR="/var/www/html/shimadaweb.online"
BACKUP_DIR="/var/www/html/backup/shimadaweb-$(date +%Y%m%d_%H%M%S)"
REPO_URL="https://github.com/hananogithub/shimadaweb.git"

echo "📁 デプロイ先ディレクトリ: $DEPLOY_DIR"
echo "💾 バックアップディレクトリ: $BACKUP_DIR"

# バックアップ作成
echo "📦 既存ファイルのバックアップを作成中..."
if [ -d "$DEPLOY_DIR" ]; then
    mkdir -p "$(dirname "$BACKUP_DIR")"
    cp -r "$DEPLOY_DIR" "$BACKUP_DIR"
    echo "✅ バックアップ完了: $BACKUP_DIR"
else
    echo "ℹ️  既存のデプロイディレクトリが見つかりません（初回デプロイ）"
fi

# デプロイディレクトリの準備
echo "📂 デプロイディレクトリを準備中..."
mkdir -p "$DEPLOY_DIR"
cd "$DEPLOY_DIR"

# Gitリポジトリから最新版を取得
echo "📥 最新のコードを取得中..."
if [ -d ".git" ]; then
    git pull origin main
    echo "✅ Git pull完了"
else
    git clone "$REPO_URL" .
    echo "✅ Git clone完了"
fi

# ファイル権限の設定
echo "🔐 ファイル権限を設定中..."
chmod 644 *.html *.css *.js *.php *.xml *.txt *.md
chmod 755 .
chmod 644 .htaccess

# PHPファイルの権限設定
chmod 644 contact.php
echo "✅ ファイル権限設定完了"

# 設定ファイルの確認
echo "⚙️  設定ファイルを確認中..."
if [ -f "contact.php" ]; then
    echo "✅ contact.php が見つかりました"
    # メール送信先の確認
    if grep -q "info@shimadaweb.online" contact.php; then
        echo "✅ メール送信先が正しく設定されています: info@shimadaweb.online"
    else
        echo "❌ メール送信先の設定に問題があります"
    fi
else
    echo "❌ contact.php が見つかりません"
fi

# デプロイ完了の確認
echo "🔍 デプロイ完了を確認中..."
if [ -f "index.html" ] && [ -f "contact.php" ] && [ -f "script.js" ]; then
    echo "✅ 主要ファイルが正常にデプロイされました"
    echo "📧 メールフォーム送信先: info@shimadaweb.online"
    echo "🌐 ウェブサイト: https://shimadaweb.online"
else
    echo "❌ デプロイに問題があります"
    exit 1
fi

echo "=================================="
echo "🎉 デプロイが正常に完了しました！"
echo "📧 メールフォームのテストをお忘れなく"
echo "=================================="
