# 纯 UnoCSS 使用指南

## 🎯 完全摆脱 Tailwind CSS

我们已经完全移除了 Tailwind CSS 依赖，使用纯 UnoCSS 实现所有样式功能。

### 为什么选择纯 UnoCSS？

- **更轻量** - 不需要 Tailwind CSS 的庞大预设
- **更快速** - 按需生成，极致性能
- **更灵活** - 完全自定义的规则系统
- **更简洁** - 只包含项目实际需要的样式

### 我们的纯 UnoCSS 配置

```typescript
// uno.config.ts - 纯 UnoCSS 配置
export default defineConfig({
  presets: [
    presetWebFonts(), // 只使用 Web 字体预设
    presetTypography() // 排版预设
  ],
  rules: [
    // 完全自定义的规则系统
    ['flex', { 'display': 'flex' }],
    ['text-primary', { 'color': 'rgb(var(--color-text-link))' }],
    // ... 更多自定义规则
  ]
})
```

## 🚀 在项目中完全使用 UnoCSS

### 1. 基础配置

我们的项目已经配置了完整的 UnoCSS 支持：

```typescript
// uno.config.ts
export default defineConfig({
  presets: [
    presetUno(),           // Tailwind CSS 兼容
    presetTypography(),    // 排版样式
    presetWebFonts(),      // Web 字体
  ],
  transformers: [
    transformerDirectives(),    // 支持 @apply 指令
    transformerVariantGroup()   // 支持变体组语法
  ]
})
```

### 2. 可用的类名

#### 布局类名
```html
<!-- 容器和间距 -->
<div class="container mx-auto px-4">
<div class="max-w-4xl mx-auto">
<div class="space-y-4">

<!-- Flexbox -->
<div class="flex items-center justify-between">
<div class="flex-1 flex-shrink-0">

<!-- Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

#### 颜色类名
```html
<!-- 背景色 -->
<div class="bg-white dark:bg-gray-800">
<div class="bg-primary-500 hover:bg-primary-600">

<!-- 文字色 -->
<p class="text-gray-600 dark:text-gray-300">
<a class="text-primary-600 hover:text-primary-700">

<!-- 边框色 -->
<div class="border border-gray-200 dark:border-gray-700">
```

#### 响应式类名
```html
<!-- 响应式设计 -->
<div class="w-full md:w-1/2 lg:w-1/3">
<div class="text-sm md:text-base lg:text-lg">
<div class="hidden md:block lg:flex">
```

### 3. 自定义主题

我们已经配置了自定义主题色：

```typescript
theme: {
  colors: {
    primary: {
      500: 'rgb(29 116 132)', // 主色调
      600: 'rgb(20 79 90)',   // 次要色调
      // ... 更多色阶
    }
  }
}
```

使用方式：
```html
<button class="bg-primary-500 hover:bg-primary-600 text-white">
  按钮
</button>
```

### 4. 自定义快捷方式

我们定义了一些常用的快捷方式：

```typescript
shortcuts: {
  'btn-primary': 'bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded transition-colors',
  'card': 'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700',
  'input-base': 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent'
}
```

使用方式：
```html
<button class="btn-primary">主要按钮</button>
<div class="card p-4">卡片内容</div>
<input class="input-base" placeholder="输入框">
```

## 📝 实际使用示例

### 替换现有的 Tailwind 类名

**之前（可能不生效的 Tailwind 类名）：**
```html
<div class="bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
```

**现在（UnoCSS 完全支持）：**
```html
<div class="bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
```

### 使用自定义快捷方式

**之前：**
```html
<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
```

**现在：**
```html
<div class="card p-4">
```

### 使用 @apply 指令

在 CSS 文件中：
```css
.custom-button {
  @apply bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded transition-colors;
}
```

## 🎯 最佳实践

### 1. 优先使用 UnoCSS 类名
- 所有 Tailwind CSS 类名都可以直接使用
- 利用自定义快捷方式减少重复代码
- 使用主题色彩系统保持一致性

### 2. 组合使用
```html
<!-- 组合基础类名 -->
<div class="flex items-center space-x-2 p-4 card">
  <span class="text-primary-600">图标</span>
  <span class="text-gray-700 dark:text-gray-300">文本</span>
</div>
```

### 3. 响应式设计
```html
<!-- 移动优先的响应式设计 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="card p-4 hover:shadow-md transition-shadow">
    内容
  </div>
</div>
```

## 🔧 调试和开发

### 1. 开发工具
- 使用浏览器开发者工具查看生成的 CSS
- UnoCSS 只生成实际使用的样式

### 2. 类名检查
如果某个类名不生效，检查：
1. 是否在 `presetUno` 的支持范围内
2. 是否需要添加到自定义规则中
3. 是否有拼写错误

### 3. 性能优化
- UnoCSS 自动按需生成，无需手动优化
- 使用快捷方式减少重复类名
- 利用变体组语法简化代码

## 📚 总结

**完全可以使用 UnoCSS 替代 Tailwind CSS**：

✅ **优势**：
- 100% Tailwind CSS 语法兼容
- 更快的构建速度
- 更小的包体积
- 更灵活的配置

✅ **推荐做法**：
1. 使用 UnoCSS 的 Tailwind 兼容类名
2. 定义自定义快捷方式
3. 利用主题系统
4. 使用 @apply 指令组织复杂样式

现在你可以完全使用 UnoCSS，享受比 Tailwind CSS 更好的开发体验！
