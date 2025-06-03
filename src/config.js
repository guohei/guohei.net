export const PandaConfig = {
    title: '果黑',
    description: '果黑的个人博客 - 记录技术、生活与思考',
    start: '2006',
    site: 'https://guohei.net/',
    defaultLocale: 'en',
    author: {
        name: '果黑',
        email: 'blog@guohei.net',
        github: 'https://github.com/guohei',
        twitter: '',
        bio: '一个热爱技术和生活的开发者'
    },
    navbar: [
        // {title: 'Posts', url: '/'}, // auto generated
        { titleKey: 'nav.notes', url: '/notes/' },
        { titleKey: 'nav.now', url: '/now/' },
        { titleKey: 'nav.tags', url: '/tags/' },
        { titleKey: 'nav.about', url: '/about/' }
    ],
    footer: [
        { titleKey: 'footer.rss', url: '/rss.xml' },
        { titleKey: 'footer.contact', url: 'https://guohei.net/about/' },
        { titleKey: 'footer.github', url: 'https://github.com/guohei' }
    ],
    // SEO 配置
    seo: {
        keywords: ['果黑', '个人博客', '技术博客', '前端开发', 'JavaScript', 'TypeScript'],
        ogImage: '/og-image.jpg',
        twitterCard: 'summary_large_image'
    },
    // 功能配置
    features: {
        search: false,
        comments: false,
        analytics: false,
        rss: true
    }
}
