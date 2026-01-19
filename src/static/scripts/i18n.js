// 多语言支持模块
class I18n {
    constructor() {
        this.currentLang = 'zh-CN';
        this.translations = {};
        this.loadTranslations();
    }

    async loadTranslations() {
        try {
            const response = await fetch(`/vw_static/locales/${this.currentLang}.json`);
            this.translations = await response.json();
        } catch (error) {
            console.warn('Failed to load translations:', error);
            // 使用默认英文作为后备
            this.translations = this.getDefaultTranslations();
        }
    }

    getDefaultTranslations() {
        return {
            admin: {
                title: "Vaultwarden Admin Panel",
                navigation: {
                    settings: "Settings",
                    users: "Users",
                    organizations: "Organizations",
                    diagnostics: "Diagnostics",
                    vault: "Vault",
                    logout: "Log Out"
                },
                theme: {
                    toggle: "Toggle theme",
                    light: "Light",
                    dark: "Dark",
                    auto: "Auto"
                }
            }
        };
    }

    t(key, params = {}) {
        const keys = key.split('.');
        let value = this.translations;
        
        for (const k of keys) {
            value = value[k];
            if (value === undefined) {
                return key; // 如果找不到翻译，返回原始键
            }
        }
        
        // 处理参数替换
        if (typeof value === 'string') {
            return this.interpolate(value, params);
        }
        
        return value;
    }

    interpolate(str, params) {
        return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return params[key] !== undefined ? params[key] : match;
        });
    }

    // 切换语言
    async setLanguage(lang) {
        this.currentLang = lang;
        await this.loadTranslations();
        this.updatePageText();
    }

    // 更新页面文本
    updatePageText() {
        // 更新标题
        const titleElement = document.querySelector('title');
        if (titleElement) {
            titleElement.textContent = this.t('admin.title');
        }

        // 更新导航链接
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const text = link.textContent.trim();
            const key = this.getNavLinkKey(text);
            if (key) {
                link.textContent = this.t(key);
            }
        });

        // 更新主题切换按钮
        const themeButton = document.querySelector('[aria-label*="theme"]');
        if (themeButton) {
            const span = themeButton.querySelector('span:not(.theme-icon)');
            if (span) {
                span.textContent = this.t('admin.theme.toggle');
            }
        }

        // 更新下拉菜单项
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            const text = item.textContent.trim();
            if (text === 'Light') {
                item.childNodes[2].textContent = ' ' + this.t('admin.theme.light');
            } else if (text === 'Dark') {
                item.childNodes[2].textContent = ' ' + this.t('admin.theme.dark');
            } else if (text === 'Auto') {
                item.childNodes[2].textContent = ' ' + this.t('admin.theme.auto');
            }
        });

        // 更新配置区域标题
        const configTitle = document.querySelector('h6.text-white');
        if (configTitle && configTitle.textContent.includes('Configuration')) {
            configTitle.textContent = this.t('admin.settings.configuration');
        }

        // 更新按钮文本
        const saveButton = document.querySelector('button[type="submit"]');
        if (saveButton) {
            saveButton.textContent = this.t('admin.settings.save');
        }

        const resetButton = document.querySelector('#deleteConf');
        if (resetButton) {
            resetButton.textContent = this.t('admin.settings.reset_defaults');
        }
    }

    getNavLinkKey(text) {
        const mapping = {
            'Settings': 'admin.navigation.settings',
            'Users': 'admin.navigation.users',
            'Organizations': 'admin.navigation.organizations',
            'Diagnostics': 'admin.navigation.diagnostics',
            'Vault': 'admin.navigation.vault',
            'Log Out': 'admin.navigation.logout'
        };
        return mapping[text];
    }
}

// 初始化国际化支持
const i18n = new I18n();

// 页面加载完成后更新文本
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        i18n.updatePageText();
    }, 100);
});

// 导出供其他脚本使用
window.i18n = i18n;