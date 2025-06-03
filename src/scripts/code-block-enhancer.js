/**
 * 代码块增强功能
 * 包括折叠/展开和复制功能
 */

class CodeBlockEnhancer {
    constructor() {
        this.init();
    }

    init() {
        // 等待 DOM 加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.enhanceCodeBlocks());
        } else {
            this.enhanceCodeBlocks();
        }
    }

    enhanceCodeBlocks() {
        // 查找所有代码块
        const codeBlocks = document.querySelectorAll('pre[class*="language-"]');

        codeBlocks.forEach((pre, index) => {
            this.wrapCodeBlock(pre, index);
        });
    }

    wrapCodeBlock(pre, index) {
        // 获取语言类型
        const language = this.extractLanguage(pre);

        // 计算代码行数
        const lineCount = this.countLines(pre);

        // 创建包装器
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        wrapper.setAttribute('data-language', language);

        // 创建头部
        const header = this.createHeader(language, lineCount, index);

        // 创建内容容器
        const content = document.createElement('div');
        content.className = 'code-block-content expanded';
        content.id = `code-content-${index}`;

        // 包装原始代码块
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(header);
        wrapper.appendChild(content);
        content.appendChild(pre);

        // 绑定事件
        this.bindEvents(wrapper, index);
    }

    extractLanguage(pre) {
        const classList = pre.classList;
        for (let className of classList) {
            if (className.startsWith('language-')) {
                return className.replace('language-', '').toUpperCase();
            }
        }
        return 'CODE';
    }

    countLines(pre) {
        const code = pre.querySelector('code') || pre;
        const text = code.textContent || code.innerText;
        return text.split('\n').length;
    }

    createHeader(language, lineCount, index) {
        const header = document.createElement('div');
        header.className = 'code-block-header';

        const leftSection = document.createElement('div');
        leftSection.style.display = 'flex';
        leftSection.style.alignItems = 'center';
        leftSection.style.gap = '0.5rem';

        const languageSpan = document.createElement('span');
        languageSpan.className = 'code-block-language';
        languageSpan.textContent = language;

        const infoSpan = document.createElement('span');
        infoSpan.className = 'code-block-info';
        infoSpan.textContent = `${lineCount} 行`;

        leftSection.appendChild(languageSpan);
        leftSection.appendChild(infoSpan);

        const actions = document.createElement('div');
        actions.className = 'code-block-actions';

        // 折叠/展开按钮
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'code-block-toggle';
        toggleBtn.setAttribute('data-target', `code-content-${index}`);
        toggleBtn.innerHTML = `
            <span class="collapse-icon">▼</span>
            <span class="toggle-text">折叠</span>
        `;

        // 复制按钮
        const copyBtn = document.createElement('button');
        copyBtn.className = 'code-block-copy';
        copyBtn.setAttribute('data-target', `code-content-${index}`);
        copyBtn.textContent = '复制';

        actions.appendChild(toggleBtn);
        actions.appendChild(copyBtn);

        header.appendChild(leftSection);
        header.appendChild(actions);

        return header;
    }

    bindEvents(wrapper, index) {
        const toggleBtn = wrapper.querySelector('.code-block-toggle');
        const copyBtn = wrapper.querySelector('.code-block-copy');
        const content = wrapper.querySelector('.code-block-content');

        // 折叠/展开事件
        toggleBtn.addEventListener('click', () => {
            this.toggleCodeBlock(content, toggleBtn);
        });

        // 复制事件
        copyBtn.addEventListener('click', () => {
            this.copyCodeBlock(wrapper, copyBtn);
        });
    }

    toggleCodeBlock(content, toggleBtn) {
        const isCollapsed = content.classList.contains('collapsed');
        const icon = toggleBtn.querySelector('.collapse-icon');
        const text = toggleBtn.querySelector('.toggle-text');

        if (isCollapsed) {
            // 展开
            content.classList.remove('collapsed');
            content.classList.add('expanded');
            icon.textContent = '▼';
            text.textContent = '折叠';
            toggleBtn.parentElement.parentElement.classList.remove('collapsed');
        } else {
            // 折叠
            content.classList.remove('expanded');
            content.classList.add('collapsed');
            icon.textContent = '▶';
            text.textContent = '展开';
            toggleBtn.parentElement.parentElement.classList.add('collapsed');
        }
    }

    copyCodeBlock(wrapper, copyBtn) {
        const pre = wrapper.querySelector('pre');
        const code = pre.querySelector('code') || pre;

        // 获取纯文本内容
        let text = code.textContent || code.innerText;

        // 复制到剪贴板
        navigator.clipboard.writeText(text).then(() => {
            // 显示复制成功状态
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '已复制';
            copyBtn.classList.add('copied');

            // 2秒后恢复原状态
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('复制失败:', err);

            // 降级方案：使用 execCommand
            this.fallbackCopy(text, copyBtn);
        });
    }

    fallbackCopy(text, copyBtn) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '已复制';
            copyBtn.classList.add('copied');

            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('降级复制也失败:', err);
        } finally {
            document.body.removeChild(textArea);
        }
    }
}

// 自动初始化
new CodeBlockEnhancer();

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CodeBlockEnhancer;
}