module.exports = {
    base:'/document/',
    title: '猫的树',
    description: '猫的树个人笔记',
    themeConfig: {
        logo: '/assets/img/logo2.jpg',
        nav: [
            { text: 'Home', link: '/' },
            {
                text: '数据库',
                items: [
                    {
                        text: 'MySQL',
                        items: [
                            { text: 'MySQL基础篇', link: '/database/MySQL基础篇' },
                            { text: 'MySQL进阶篇', link: '/database/MySQL进阶篇' },
                        ]
                    },
                    { text: 'Group2', items: [{ text: 'Home', link: '/' },] }
                ]
            },
            { text: 'GitHub', link: 'https://github.com/cattreeo/document' },
        ],
        sidebar: 'auto'
    },
    head: [
        [
            "meta",
            {
                name: "referrer",
                content: "no-referrer"
            }
        ],
    ],
}