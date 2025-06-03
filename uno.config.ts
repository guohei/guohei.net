// uno.config.ts - 纯 UnoCSS 配置，不依赖 Tailwind
import {
    defineConfig,
    presetTypography,
    presetWebFonts,
    transformerDirectives
} from 'unocss'

export default defineConfig({
    injectReset: false,
    mode: 'per-module',
    injectEntry: process.env['NODE_ENV'] === 'development',
    transformers: [
        transformerDirectives()
    ],
    presets: [
        // Web 字体预设
        presetWebFonts({
            fonts: {
                sans: 'Inter:400,500,600,700',
                mono: 'Fira Code:400,500'
            }
        }),
        presetTypography({
            cssExtend: {
                'a': {
                    // no underline
                    textDecoration: 'none',
                    'font-size': '.9em',
                    // add underline offset
                    textDecorationThickness: '0.1em',
                    textDecorationColor: 'rgb(var(--color-text-link))'
                },
                // li word-break reference: issue #3
                'li':{
                    'word-break': 'break-all',
                },
                'li code': {
                    'white-space': 'pre-wrap',
                    'word-break': 'break-word',
                    'margin': '0.2rem',
                    'padding': '0.15em 0.3em',
                    'border-radius': '0.2em',
                    'background-color': 'var(--color-code-bg)'
                }, 
                'li code::after': {
                    content: 'none'
                },
                'li code::before': {
                    content: 'none'
                },  
                'a:hover': {
                    color: 'rgb(var(--color-text-link-hover))'
                },
                'pre code': {
                    margin: '0.2rem',
                    padding: '0.15em 0.3em',
                    'border-radius': '0.2em',
                    'background-color': 'var(--color-code-bg)'
                },
                'p code::after': {
                    content: 'none'
                },
                'p code::before': {
                    content: 'none'
                },
                // blockquote word-break reference: issue #3
                'blockquote p': {
                    'word-break': 'break-all',
                },
                'blockquote code': {
                    'white-space': 'pre-wrap',
                    'word-break': 'break-word',
                    'margin': '0.2rem',
                    'padding': '0.15em 0.3em',
                    'border-radius': '0.2em',
                    'background-color': 'var(--color-code-bg)'
                }
            }
        })
    ],
    // 纯 UnoCSS 规则定义
    rules: [
        // 布局相关
        ['flex', { 'display': 'flex' }],
        ['flex-col', { 'flex-direction': 'column' }],
        ['flex-row', { 'flex-direction': 'row' }],
        ['flex-wrap', { 'flex-wrap': 'wrap' }],
        ['items-center', { 'align-items': 'center' }],
        ['items-start', { 'align-items': 'flex-start' }],
        ['items-end', { 'align-items': 'flex-end' }],
        ['justify-center', { 'justify-content': 'center' }],
        ['justify-between', { 'justify-content': 'space-between' }],
        ['justify-start', { 'justify-content': 'flex-start' }],
        ['justify-end', { 'justify-content': 'flex-end' }],
        ['flex-1', { 'flex': '1 1 0%' }],
        ['flex-shrink-0', { 'flex-shrink': '0' }],

        // 网格布局
        ['grid', { 'display': 'grid' }],
        ['grid-cols-1', { 'grid-template-columns': 'repeat(1, minmax(0, 1fr))' }],
        ['grid-cols-2', { 'grid-template-columns': 'repeat(2, minmax(0, 1fr))' }],
        ['grid-cols-3', { 'grid-template-columns': 'repeat(3, minmax(0, 1fr))' }],
        ['gap-1', { 'gap': '0.25rem' }],
        ['gap-2', { 'gap': '0.5rem' }],
        ['gap-4', { 'gap': '1rem' }],
        ['gap-6', { 'gap': '1.5rem' }],

        // 间距
        ['m-0', { 'margin': '0' }],
        ['m-1', { 'margin': '0.25rem' }],
        ['m-2', { 'margin': '0.5rem' }],
        ['m-4', { 'margin': '1rem' }],
        ['m-6', { 'margin': '1.5rem' }],
        ['m-8', { 'margin': '2rem' }],
        ['mt-1', { 'margin-top': '0.25rem' }],
        ['mt-2', { 'margin-top': '0.5rem' }],
        ['mt-4', { 'margin-top': '1rem' }],
        ['mt-6', { 'margin-top': '1.5rem' }],
        ['mt-8', { 'margin-top': '2rem' }],
        ['mb-1', { 'margin-bottom': '0.25rem' }],
        ['mb-2', { 'margin-bottom': '0.5rem' }],
        ['mb-4', { 'margin-bottom': '1rem' }],
        ['mb-6', { 'margin-bottom': '1.5rem' }],
        ['mb-8', { 'margin-bottom': '2rem' }],
        ['ml-2', { 'margin-left': '0.5rem' }],
        ['ml-3', { 'margin-left': '0.75rem' }],
        ['ml-4', { 'margin-left': '1rem' }],
        ['ml-auto', { 'margin-left': 'auto' }],
        ['mr-2', { 'margin-right': '0.5rem' }],
        ['mr-4', { 'margin-right': '1rem' }],
        ['mx-auto', { 'margin-left': 'auto', 'margin-right': 'auto' }],
        ['my-6', { 'margin-top': '1.5rem', 'margin-bottom': '1.5rem' }],

        ['p-1', { 'padding': '0.25rem' }],
        ['p-2', { 'padding': '0.5rem' }],
        ['p-3', { 'padding': '0.75rem' }],
        ['p-4', { 'padding': '1rem' }],
        ['p-6', { 'padding': '1.5rem' }],
        ['px-1', { 'padding-left': '0.25rem', 'padding-right': '0.25rem' }],
        ['px-2', { 'padding-left': '0.5rem', 'padding-right': '0.5rem' }],
        ['px-3', { 'padding-left': '0.75rem', 'padding-right': '0.75rem' }],
        ['px-4', { 'padding-left': '1rem', 'padding-right': '1rem' }],
        ['py-1', { 'padding-top': '0.25rem', 'padding-bottom': '0.25rem' }],
        ['py-2', { 'padding-top': '0.5rem', 'padding-bottom': '0.5rem' }],
        ['pl-1', { 'padding-left': '0.25rem' }],
        ['pl-4', { 'padding-left': '1rem' }],

        // 宽度和高度
        ['w-full', { 'width': '100%' }],
        ['w-4', { 'width': '1rem' }],
        ['w-5', { 'width': '1.25rem' }],
        ['w-16', { 'width': '4rem' }],
        ['h-4', { 'height': '1rem' }],
        ['h-5', { 'height': '1.25rem' }],
        ['max-w-prose', { 'max-width': '65ch' }],
        ['max-w-md', { 'max-width': '28rem' }],
        ['max-w-4xl', { 'max-width': '56rem' }],

        // 定位
        ['relative', { 'position': 'relative' }],
        ['absolute', { 'position': 'absolute' }],
        ['inset-y-0', { 'top': '0', 'bottom': '0' }],
        ['left-0', { 'left': '0' }],
        ['right-0', { 'right': '0' }],

        // 显示和隐藏
        ['block', { 'display': 'block' }],
        ['inline', { 'display': 'inline' }],
        ['inline-block', { 'display': 'inline-block' }],
        ['hidden', { 'display': 'none' }],

        // 内容对齐
        ['place-content-center', { 'place-content': 'center' }],

        // 文字相关
        ['text-xs', { 'font-size': '0.75rem', 'line-height': '1rem' }],
        ['text-sm', { 'font-size': '0.875rem', 'line-height': '1.25rem' }],
        ['text-base', { 'font-size': '1rem', 'line-height': '1.5rem' }],
        ['text-lg', { 'font-size': '1.125rem', 'line-height': '1.75rem' }],
        ['text-xl', { 'font-size': '1.25rem', 'line-height': '1.75rem' }],
        ['text-2xl', { 'font-size': '1.5rem', 'line-height': '2rem' }],
        ['text-3xl', { 'font-size': '1.875rem', 'line-height': '2.25rem' }],
        ['font-normal', { 'font-weight': '400' }],
        ['font-medium', { 'font-weight': '500' }],
        ['font-semibold', { 'font-weight': '600' }],
        ['font-bold', { 'font-weight': '700' }],
        ['italic', { 'font-style': 'italic' }],
        ['text-center', { 'text-align': 'center' }],

        // 颜色 - 使用主题变量
        ['text-primary', { 'color': 'rgb(var(--color-text-link))' }],
        ['text-secondary', { 'color': 'rgb(var(--color-text-body))' }],
        ['text-heading', { 'color': 'rgb(var(--color-text-heading))' }],
        ['bg-primary', { 'background-color': 'rgb(var(--color-primary-main))' }],
        ['bg-secondary', { 'background-color': 'rgb(var(--color-secondary-main))' }],

        // 边框和圆角
        ['border', { 'border-width': '1px', 'border-style': 'solid', 'border-color': 'rgb(var(--color-border))' }],
        ['border-l-2', { 'border-left-width': '2px', 'border-left-style': 'solid', 'border-left-color': 'rgba(var(--color-border), 0.3)' }],
        ['rounded', { 'border-radius': '0.25rem' }],
        ['rounded-lg', { 'border-radius': '0.5rem' }],
        ['rounded-full', { 'border-radius': '9999px' }],

        // 阴影
        ['shadow-sm', { 'box-shadow': '0 1px 2px 0 rgb(0 0 0 / 0.05)' }],
        ['shadow-md', { 'box-shadow': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }],

        // 过渡动画
        ['transition-all', { 'transition-property': 'all', 'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)', 'transition-duration': '150ms' }],
        ['transition-colors', { 'transition-property': 'color, background-color, border-color, text-decoration-color, fill, stroke', 'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)', 'transition-duration': '150ms' }],
        ['transition-shadow', { 'transition-property': 'box-shadow', 'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)', 'transition-duration': '150ms' }],
        ['duration-200', { 'transition-duration': '200ms' }],
        ['duration-300', { 'transition-duration': '300ms' }],

        // 光标
        ['cursor-pointer', { 'cursor': 'pointer' }],
        ['pointer-events-none', { 'pointer-events': 'none' }],

        // 文本装饰
        ['no-underline', { 'text-decoration': 'none' }],
        ['underline', { 'text-decoration': 'underline' }],
        ['underline-offset-4', { 'text-underline-offset': '4px' }],

        // 最大宽度
        ['max-w-[65ch]', { 'max-width': '65ch' }],
        ['max-w-prose', { 'max-width': '65ch' }],

        // Prose 样式类
        ['prose', {
            'color': 'rgb(var(--color-text-body))',
            'max-width': '65ch',
            'line-height': '1.75'
        }],
        ['prose-stone', { /* 石色主题，通过 CSS 变量控制 */ }],
        ['prose-invert', {
            'color': 'rgb(var(--color-text-body))'
        }],

        // 边框样式
        ['border-l-solid', { 'border-left-style': 'solid' }],
        ['rounded-l-sm', { 'border-top-left-radius': '0.125rem', 'border-bottom-left-radius': '0.125rem' }],

        // 背景色（用于 prose 样式）
        ['bg-gray-100', { 'background-color': '#f3f4f6' }],
        ['bg-stone-600', { 'background-color': '#57534e' }],

        // 文本颜色（补充）
        ['text-blue-700', { 'color': '#1d4ed8' }],
        ['text-stone-100', { 'color': '#f5f5f4' }],
        ['text-secondary', { 'color': 'rgb(var(--color-text-secondary))' }],

        // 字体
        ['font-normal', { 'font-weight': '400' }],
        ['font-semibold', { 'font-weight': '600' }],

        // 间距（补充）
        ['mr-4', { 'margin-right': '1rem' }],

        // 透明度
        ['opacity-100', { 'opacity': '1' }],
        ['opacity-80', { 'opacity': '0.8' }],

        // 边框
        ['border-0', { 'border-width': '0' }],

        // 背景
        ['bg-transparent', { 'background-color': 'transparent' }],

        // 填充颜色
        ['fill-black', { 'fill': '#000000' }],
        ['fill-white', { 'fill': '#ffffff' }],
        ['fill-transparent', { 'fill': 'transparent' }],

        // 主题相关的自定义类
        ['panda-link', {
            'color': 'rgb(var(--color-text-link))',
            'text-decoration': 'none',
            'cursor': 'pointer',
            'transition': 'all 0.25s ease-in-out'
        }],
        ['panda-link-static', {
            'color': 'rgb(var(--color-text-link))',
            'text-decoration': 'none',
            'cursor': 'pointer'
        }],
        ['max-width', {
            'max-width': '65ch',
            'margin': '0 auto'
        }],

        // 主题切换按钮样式
        ['theme-toggle-btn', {
            'cursor': 'pointer',
            'border': 'none',
            'background': 'transparent',
            'padding': '0.5rem',
            'border-radius': '0.5rem',
            'transition': 'all 0.2s ease',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'width': '2.5rem',
            'height': '2.5rem'
        }],
        ['theme-icon', {
            'width': '24px',
            'height': '24px',
            'transition': 'transform 0.2s ease'
        }],
        ['moon-icon', {
            'fill': 'rgb(var(--color-text-heading))',
            'opacity': '1'
        }],
        ['sun-icon', {
            'fill': 'transparent',
            'opacity': '0'
        }],

        // 标签和归档页面的自定义样式
        ['tag-count', {
            'background-color': 'rgba(var(--color-primary-main), 0.1)',
            'color': 'rgb(var(--color-text-body))'
        }],
        ['tag-cloud-item', {
            'background-color': 'rgba(var(--color-primary-main), 0.1)',
            'color': 'rgb(var(--color-text-link))'
        }],
        ['post-count', {
            'background-color': 'rgba(var(--color-primary-main), 0.1)',
            'color': 'rgb(var(--color-text-body))'
        }],
        ['post-tag', {
            'background-color': 'rgba(var(--color-primary-main), 0.1)',
            'color': 'rgb(var(--color-text-link))'
        }]
    ],
    // 变体规则（响应式、伪类等）
    variants: [
        // 响应式变体
        (matcher) => {
            if (!matcher.startsWith('md:')) return matcher
            return {
                matcher: matcher.slice(3),
                selector: s => `@media (min-width: 768px) { ${s} }`
            }
        },
        (matcher) => {
            if (!matcher.startsWith('lg:')) return matcher
            return {
                matcher: matcher.slice(3),
                selector: s => `@media (min-width: 1024px) { ${s} }`
            }
        },
        // 悬停变体
        (matcher) => {
            if (!matcher.startsWith('hover:')) return matcher
            return {
                matcher: matcher.slice(6),
                selector: s => `${s}:hover`
            }
        },
        // 焦点变体
        (matcher) => {
            if (!matcher.startsWith('focus:')) return matcher
            return {
                matcher: matcher.slice(6),
                selector: s => `${s}:focus`
            }
        },
        // 深色模式变体
        (matcher) => {
            if (!matcher.startsWith('dark:')) return matcher
            return {
                matcher: matcher.slice(5),
                selector: s => `:root.dark ${s}`
            }
        }
    ],
    // 快捷方式组合
    shortcuts: {
        'container': 'max-w-4xl mx-auto px-4',
        'btn-base': 'px-4 py-2 rounded cursor-pointer transition-colors',
        'btn-primary': 'btn-base bg-primary text-white',
        'card': 'p-4 rounded-lg shadow-sm border',
        'input-base': 'w-full px-3 py-2 border rounded',
        'flex-center': 'flex items-center justify-center',
        'flex-between': 'flex items-center justify-between'
    }
})
