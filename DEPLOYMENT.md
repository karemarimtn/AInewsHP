# 🚀 AI News Hub - デプロイメントガイド

## 📋 概要

このガイドでは、AI News Hubを安全にデプロイし、適切にAPIキーを設定する方法を説明します。

## 🔐 セキュリティ改善

### ✅ 完了した改善点

1. **APIキーのハードコーディング削除**
   - 全てのAPIキーをソースコードから除去
   - 設定管理システム（`config.js`）を実装
   - 環境変数サポートを追加

2. **フォールバックシステム強化**
   - API無効時の graceful degradation
   - デモデータでの継続稼働
   - エラーハンドリングの改善

3. **設定管理システム**
   - 開発環境と本番環境の分離
   - セキュリティチェック機能
   - デバッグモード対応

## 🛠️ セットアップ手順

### 1. 環境変数の設定

#### 開発環境（ローカル）

```bash
# .env ファイルを作成
cp .env.example .env

# .env ファイルを編集して実際のAPIキーを設定
nano .env
```

#### 本番環境

**Netlify の場合:**
```bash
# Netlify CLI を使用
netlify env:set NEWS_API_KEY "your_actual_news_api_key"
netlify env:set YOUTUBE_API_KEY "your_youtube_api_key"
```

**Vercel の場合:**
```bash
# Vercel CLI を使用
vercel env add NEWS_API_KEY
vercel env add YOUTUBE_API_KEY
```

**GitHub Pages の場合:**
- GitHub Secrets に環境変数を設定
- Actions で環境変数をビルド時に注入

### 2. APIキーの取得

#### News API (必須)
1. [NewsAPI.org](https://newsapi.org/) にアクセス
2. 無料アカウントを作成
3. APIキーを取得
4. `.env` に `NEWS_API_KEY=your_key_here` を追加

#### YouTube Data API v3 (オプション)
1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. 新しいプロジェクトを作成
3. YouTube Data API v3 を有効化
4. APIキーを作成
5. `.env` に `YOUTUBE_API_KEY=your_key_here` を追加

#### X (Twitter) API (オプション)
1. [Twitter Developer Portal](https://developer.twitter.com/) にアクセス
2. アプリケーションを作成
3. Bearer Token を取得
4. `.env` に `TWITTER_API_KEY=your_bearer_token` を追加

#### Google Trends API (オプション)
- 現在、公式APIは限定的
- サードパーティサービスまたは代替手段を検討

### 3. ローカル開発

```bash
# プロジェクトをクローン
git clone https://github.com/karemarimtn/AInewsHP.git
cd AInewsHP

# 環境変数を設定
cp .env.example .env
# .env ファイルを編集してAPIキーを追加

# ローカルサーバーを起動
python3 -m http.server 8000
# または
npx serve .

# ブラウザでアクセス
open http://localhost:8000
```

### 4. 開発環境でのAPIキー設定

開発環境では、ブラウザのコンソールから直接APIキーを設定できます：

```javascript
// ブラウザの開発者ツールコンソールで実行
AppConfig.setDevelopmentApiKey('news', 'your_news_api_key');
AppConfig.setDevelopmentApiKey('youtube', 'your_youtube_api_key');

// 設定確認
AppConfig.logConfig();
```

## 🌐 デプロイメント

### Netlify デプロイ

```bash
# netlify.toml を作成
cat > netlify.toml << EOF
[build]
  publish = "."
  
[build.environment]
  NODE_ENV = "production"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
EOF

# デプロイ
netlify deploy --prod
```

### Vercel デプロイ

```bash
# vercel.json を作成
cat > vercel.json << EOF
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
EOF

# デプロイ
vercel --prod
```

### GitHub Pages デプロイ

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
          
      - name: Build and Deploy
        env:
          NEWS_API_KEY: ${{ secrets.NEWS_API_KEY }}
          YOUTUBE_API_KEY: ${{ secrets.YOUTUBE_API_KEY }}
        run: |
          # 環境変数をconfig.jsに注入（本番環境用）
          echo "window.ENV = { NEWS_API_KEY: '$NEWS_API_KEY', YOUTUBE_API_KEY: '$YOUTUBE_API_KEY' };" > env.js
          
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## 🔒 セキュリティベストプラクティス

### 1. APIキー保護

- ✅ APIキーをソースコードに含めない
- ✅ `.gitignore` で環境変数ファイルを除外
- ✅ 本番環境では環境変数を使用
- ✅ 開発環境ではローカルストレージを活用

### 2. CORS対策

- ✅ プロキシサービス（allorigins.win）を使用
- 🔄 将来的にはサーバーサイドプロキシを検討

### 3. API制限対策

- ✅ フォールバックデータシステム実装
- ✅ エラーハンドリング強化
- ✅ レート制限への対応

## 📊 監視とメンテナンス

### パフォーマンス監視

```javascript
// ブラウザコンソールで実行
console.group('🔍 AI News Hub 状態確認');
console.log('設定状況:', AppConfig.config);
console.log('有効なAPI:', Object.keys(AppConfig.config.apis).filter(api => AppConfig.isApiEnabled(api)));
console.log('最終更新:', new Date().toLocaleString('ja-JP'));
console.groupEnd();
```

### ログ確認

```javascript
// エラーログの確認
console.log('エラーログ確認 - ネットワークタブをチェック');
```

## 🚨 トラブルシューティング

### よくある問題

1. **APIキーが認識されない**
   ```javascript
   // 解決方法: ブラウザコンソールで確認
   console.log('API設定:', AppConfig.config.apis.news);
   ```

2. **CORS エラー**
   - allorigins.win プロキシが機能していることを確認
   - 代替プロキシサービスを検討

3. **API制限に達した場合**
   - フォールバックデータが自動で使用される
   - APIキーの制限を確認し、必要に応じて有料プランに変更

## 📞 サポート

問題が発生した場合:

1. [Issues](https://github.com/karemarimtn/AInewsHP/issues) で既知の問題を確認
2. 新しい問題を報告
3. [Discussions](https://github.com/karemarimtn/AInewsHP/discussions) でコミュニティに質問

---

**重要**: このガイドに従って適切にセットアップすることで、セキュアで信頼性の高いAI News Hubを運用できます。