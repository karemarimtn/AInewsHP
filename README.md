# 🤖 AI News Hub

**世界最大級のAIニュース集約サイト**

リアルタイムでAI関連ニュース、トレンド、研究情報を一箇所で提供する次世代ニュースプラットフォームです。

![AI News Hub](https://img.shields.io/badge/AI-News%20Hub-blue?style=for-the-badge&logo=robot)
![Version](https://img.shields.io/badge/version-2.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)

## 🚀 主な機能

### 📊 マルチAPI統合トレンド分析システム
- **YouTube API**: AI関連動画のトレンド分析
- **X (Twitter) API**: ソーシャルメディアのAI話題度
- **Google Trends API**: 検索トレンドデータ統合
- **News API**: 世界中のAIニュース収集

### 🌐 信頼できる情報源
**日本のAIメディア（5サイト）**
- [AINOW](https://ainow.ai/) - 日本最大級のAI専門メディア
- [ITmedia AI+](https://aitimes.media/) - ビジネス向けAI情報
- [AI-SCHOLAR](https://ai-scholar.tech/) - 研究論文解説
- [Ledge.ai](https://ledge.ai/) - エンジニア向け技術情報
- [AI+](https://project.nikkeibp.co.jp/ait/) - 業界ニュース

**海外のAIメディア（5サイト）**
- [AI News](https://www.artificialintelligence-news.com/)
- [AI Daily](https://aidaily.us/)
- [AiNews.com](https://www.ainews.com/)
- [MIT News AI](https://news.mit.edu/topic/artificial-intelligence2)
- [TensorFlow Blog](https://blog.tensorflow.org/)

### ⚡ リアルタイム機能
- **自動更新**: 30分間隔でトレンド分析
- **手動更新**: ワンクリックでトレンド更新
- **並行処理**: 複数APIからの高速データ取得
- **フォールバック**: API障害時の安定稼働

## 🛠️ 技術仕様

### フロントエンド
- **HTML5** + **CSS3** (Grid, Flexbox, Custom Properties)
- **Vanilla JavaScript** (ES6+)
- **Font Awesome** 6.4.0
- **Google Fonts** (Noto Sans JP, Inter)

### API統合
```javascript
// セキュアな設定管理システム
const APIConfig = {
  news: "News API (環境変数で設定)",
  youtube: "YouTube Data API v3 (環境変数で設定)",
  twitter: "X API v2 (環境変数で設定)",
  googleTrends: "Google Trends API (環境変数で設定)"
};

// 🔒 セキュリティ改善済み:
// - APIキーのハードコーディングを削除
// - 環境変数による設定管理
// - フォールバックシステム実装
```

### アーキテクチャ
```
AI News Hub/
├── index.html              # メインサイト
├── trend_analyzer.js       # トレンド分析エンジン
├── config.js              # 🔒 設定管理システム（NEW）
├── test_multi_api.html     # API動作テスト
├── .env.example           # 🔒 環境変数テンプレート（NEW）
├── .gitignore             # 🔒 セキュリティ設定（NEW）
├── DEPLOYMENT.md          # 🚀 デプロイガイド（NEW）
└── README.md              # このファイル
```

### 🔒 セキュリティ強化（v2.1.0）

**新機能:**
- **設定管理システム**: APIキーの安全な管理
- **環境変数サポート**: 本番環境での適切な設定
- **フォールバックシステム**: API障害時の継続稼働
- **セキュリティチェック**: 開発/本番環境の自動判定

**削除した脆弱性:**
- ❌ ハードコーディングされたAPIキー
- ❌ ソースコードに埋め込まれた機密情報
- ❌ 設定管理の欠如

## 📸 スクリーンショット

### メインページ
- 🎨 モダンなグラデーションデザイン
- 📱 完全レスポンシブ対応
- 🔍 高速検索機能

### トレンドランキング
- 🏆 リアルタイムトップ10表示
- 📊 ソース別アイコン表示
- 📈 成長率と感情分析
- 🎯 カテゴリ別色分け

## 🚀 クイックスタート

### 1. リポジトリをクローン
```bash
git clone https://github.com/karemarimtn/AInewsHP.git
cd AInewsHP
```

### 2. 🔒 セキュア設定（重要）
```bash
# 環境変数テンプレートをコピー
cp .env.example .env

# APIキーを設定（.envファイルを編集）
nano .env
```

**必要なAPIキー:**
- [News API](https://newsapi.org/) - 無料プランあり
- [YouTube API](https://console.developers.google.com/) - オプション
- [X API](https://developer.twitter.com/) - オプション

### 3. ローカルサーバーで起動
```bash
# Python 3の場合
python3 -m http.server 8000

# Node.jsの場合
npx serve .

# PHP内蔵サーバーの場合
php -S localhost:8000
```

### 4. ブラウザでアクセス
```
http://localhost:8000
```

### 5. 🔧 開発環境での設定確認
ブラウザの開発者ツール（F12）を開き、コンソールで：
```javascript
// 設定状況を確認
AppConfig.logConfig();

// 開発環境でAPIキーを設定（一時的）
AppConfig.setDevelopmentApiKey('news', 'your_api_key');
```

**詳細な設定方法**: [DEPLOYMENT.md](./DEPLOYMENT.md) を参照

## 🧪 テスト機能

### API動作テスト
`test_multi_api.html` でAPI統合をテスト:

1. **マルチソース分析テスト**
   - 全API同時実行
   - トレンド結果表示
   - パフォーマンス測定

2. **個別APIテスト**
   - YouTube API動作確認
   - X API接続テスト
   - Google Trends検証
   - News API レスポンステスト

## ⚙️ 高度な設定

### カスタマイズ可能な項目

#### トレンド分析設定
```javascript
// trend_analyzer.js内で調整可能
const CONFIG = {
  updateInterval: 30 * 60 * 1000,  // 更新間隔(ms)
  maxTrends: 10,                   // 表示トレンド数
  sourceWeights: {                 // ソース重み
    news: 0.4,
    youtube: 0.25,
    twitter: 0.2,
    googleTrends: 0.15
  }
};
```

#### 検索クエリ
```javascript
// AI関連検索キーワード
const AI_QUERIES = [
  'artificial intelligence',
  'machine learning',
  'ChatGPT',
  'OpenAI',
  'deep learning'
];
```

## 📊 分析アルゴリズム

### 重み付けスコア計算
```javascript
const trendScore = baseFrequency * (1 + sentimentScore * 0.1) * (1 + sourceBonus);
```

### カテゴリ分類
- **Models**: GPT, Claude, Gemini, LLaMA
- **Companies**: OpenAI, Google, Microsoft, Meta
- **Technologies**: Transformer, Neural Network, NLP
- **Applications**: Robotics, Healthcare, Automation
- **Concepts**: AGI, AI Safety, Ethics
- **Industries**: Finance, Education, Automotive

## 🔧 トラブルシューティング

### よくある問題

#### CORS エラー
```javascript
// プロキシサーバー使用で解決
const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;
```

#### API制限
- News API: 1000リクエスト/日（開発プラン）
- YouTube API: 10000クォータ/日
- 解決策: フォールバックデータ実装済み

#### 表示不具合
- **文字の視認性**: ハイコントラスト設定済み
- **レスポンシブ**: モバイルファースト設計
- **ブラウザ対応**: モダンブラウザ最適化

## 🎯 パフォーマンス

### 最適化機能
- **並行API呼び出し**: `Promise.allSettled()`使用
- **重複排除**: 記事の自動deduplication
- **キャッシュ機能**: ブラウザローカルストレージ活用
- **遅延ローディング**: 画像とコンテンツの段階的読み込み

### 測定結果
- 初期読み込み: ~3秒
- API応答時間: ~2秒
- トレンド更新: ~1.5秒

## 🤝 コントリビューション

### 開発に参加する方法

1. **Fork** このリポジトリ
2. **Feature branch** を作成 (`git checkout -b feature/amazing-feature`)
3. **Commit** 変更内容 (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Pull Request** を作成

### 報告・提案
- 🐛 バグ報告: [Issues](https://github.com/karemarimtn/AInewsHP/issues)
- ✨ 機能提案: [Discussions](https://github.com/karemarimtn/AInewsHP/discussions)
- 💡 改善案: Pull Request歓迎

## 📝 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルをご覧ください。

## 🙏 謝辞

### 利用API・サービス
- [News API](https://newsapi.org/) - ニュースデータ提供
- [YouTube Data API](https://developers.google.com/youtube/v3) - 動画トレンド
- [Google Trends](https://trends.google.com/) - 検索トレンド
- [Font Awesome](https://fontawesome.com/) - アイコン
- [Google Fonts](https://fonts.google.com/) - Webフォント

### 情報提供メディア
日本・海外の優良なAIニュースメディアの皆様に感謝いたします。

## 📞 お問い合わせ

- **GitHub**: [@karemarimtn](https://github.com/karemarimtn)
- **Project**: [AI News Hub](https://github.com/karemarimtn/AInewsHP)

---

⭐ **このプロジェクトが役に立ったら、ぜひStar⭐をお願いします！**

![Star](https://img.shields.io/github/stars/karemarimtn/AInewsHP?style=social)
![Fork](https://img.shields.io/github/forks/karemarimtn/AInewsHP?style=social)
![Watch](https://img.shields.io/github/watchers/karemarimtn/AInewsHP?style=social)