/* config/nav.ts */
import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
    { text: '主页', link: '/' },
    { text: '数据结构', link: '/data/' },
    { text: '算法', link: '/algo/' },
    {
        text: '专业',
        items: [
            { text: '数学', link: '/math/' },
            { text: '物理', link: '/physics/' },
        ],
    },
    { text: '工具', link: '/tool/' },
    { text: '库', link: '/libs/' },
    { text: '资源', link: '/res/' }

]
