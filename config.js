// 🔧 AI News Hub - 設定管理システム
class ConfigManager {
    constructor() {
        this.config = this.loadConfig();
        this.isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    }

    loadConfig() {
        // 本番環境では環境変数から、開発環境では安全なデフォルト値を使用
        return {
            // API設定
            apis: {
                news: {
                    key: this.getEnvValue('NEWS_API_KEY', ''),
                    baseUrl: 'https://newsapi.org/v2',
                    enabled: true
                },
                youtube: {
                    key: this.getEnvValue('YOUTUBE_API_KEY', ''),
                    baseUrl: 'https://www.googleapis.com/youtube/v3',
                    enabled: false // 本番では適切なキーを設定後に有効化
                },
                twitter: {
                    key: this.getEnvValue('TWITTER_API_KEY', ''),
                    baseUrl: 'https://api.twitter.com/2',
                    enabled: false // 本番では適切なキーを設定後に有効化
                },
                googleTrends: {
                    key: this.getEnvValue('GOOGLE_TRENDS_API_KEY', ''),
                    enabled: false // 本番では適切なキーを設定後に有効化
                }
            },

            // CORS設定
            corsProxy: this.getEnvValue('CORS_PROXY_URL', 'https://api.allorigins.win/get?url='),

            // アプリケーション設定
            app: {
                updateInterval: parseInt(this.getEnvValue('TREND_UPDATE_INTERVAL', '1800000')), // 30分
                maxTrends: parseInt(this.getEnvValue('MAX_TRENDS_DISPLAY', '10')),
                fallbackEnabled: true,
                debugMode: this.isDevelopment
            },

            // フォールバック設定
            fallback: {
                enabled: true,
                useDemo: this.isDevelopment,
                maxRetries: 3,
                retryDelay: 2000
            }
        };
    }

    // 環境変数の取得（フォールバック付き）
    getEnvValue(key, defaultValue) {
        // ブラウザ環境では process.env が利用できない場合があるため安全にアクセス
        try {
            if (typeof process !== 'undefined' && process.env && process.env[key]) {
                return process.env[key];
            }
            
            // ローカルストレージからの設定取得（開発用）
            if (this.isDevelopment) {
                const localValue = localStorage.getItem(`AI_NEWS_${key}`);
                if (localValue) return localValue;
            }
            
            return defaultValue;
        } catch (error) {
            console.warn(`環境変数 ${key} の取得に失敗:`, error);
            return defaultValue;
        }
    }

    // API設定の取得
    getApiConfig(apiName) {
        const apiConfig = this.config.apis[apiName];
        if (!apiConfig) {
            throw new Error(`未知のAPI: ${apiName}`);
        }
        return apiConfig;
    }

    // APIキーの検証
    isApiEnabled(apiName) {
        try {
            const apiConfig = this.getApiConfig(apiName);
            const hasKey = apiConfig.key && apiConfig.key.length > 0 && apiConfig.key !== 'your_' + apiName + '_api_key_here';
            return apiConfig.enabled && hasKey;
        } catch (error) {
            console.warn(`API ${apiName} の設定確認に失敗:`, error);
            return false;
        }
    }

    // CORS プロキシURL生成
    buildProxyUrl(targetUrl) {
        if (!targetUrl) {
            throw new Error('対象URLが指定されていません');
        }
        return `${this.config.corsProxy}${encodeURIComponent(targetUrl)}`;
    }

    // 設定情報のログ出力（デバッグ用）
    logConfig() {
        if (!this.config.app.debugMode) return;
        
        console.group('🔧 AI News Hub 設定情報');
        console.log('環境:', this.isDevelopment ? '開発' : '本番');
        console.log('有効なAPI:');
        
        Object.keys(this.config.apis).forEach(apiName => {
            const enabled = this.isApiEnabled(apiName);
            console.log(`  ${apiName}: ${enabled ? '✅' : '❌'}`);
        });
        
        console.log('フォールバック:', this.config.fallback.enabled ? '有効' : '無効');
        console.log('更新間隔:', `${this.config.app.updateInterval / 1000 / 60}分`);
        console.groupEnd();
    }

    // 開発環境用: ローカルストレージにAPIキーを保存
    setDevelopmentApiKey(apiName, apiKey) {
        if (!this.isDevelopment) {
            console.warn('本番環境ではこの機能は使用できません');
            return false;
        }
        
        localStorage.setItem(`AI_NEWS_${apiName.toUpperCase()}_API_KEY`, apiKey);
        console.log(`✅ ${apiName} APIキーを保存しました`);
        
        // 設定を再読み込み
        this.config = this.loadConfig();
        return true;
    }

    // セキュリティチェック
    performSecurityCheck() {
        const issues = [];
        
        // 開発環境での警告
        if (this.isDevelopment) {
            issues.push('⚠️ 開発環境で実行中 - 本番環境では適切な環境変数を設定してください');
        }
        
        // APIキーの露出チェック
        Object.entries(this.config.apis).forEach(([apiName, config]) => {
            if (config.key && config.key.length > 10) {
                // 本番環境でAPIキーがソースコードに含まれている場合の警告
                if (!this.isDevelopment && config.key.includes('your_')) {
                    issues.push(`❌ ${apiName} APIキーがデフォルト値のままです`);
                }
            }
        });
        
        if (issues.length > 0) {
            console.group('🔒 セキュリティチェック結果');
            issues.forEach(issue => console.warn(issue));
            console.groupEnd();
        }
        
        return issues;
    }
}

// グローバル設定インスタンス
window.AppConfig = new ConfigManager();

// 初期化時に設定を確認
document.addEventListener('DOMContentLoaded', () => {
    window.AppConfig.logConfig();
    window.AppConfig.performSecurityCheck();
});