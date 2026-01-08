const TEXTS = {
  zh: {
    searchPlaceholder: "搜索文章...",
    noResults: "没有匹配的文章",
    prevPost: "上一篇：",
    nextPost: "下一篇：",
    home: "首页",
    toggleSort: "切换排序",
    backHome: "返回首页",
    showCategory: "显示分类",
    showToc: "显示目录",
    toggleTheme: "切换夜间模式",
    backToTop: "回到顶部",
    sidebarCategory: "分类",
    sidebarTime: "时间",
    sidebarToc: "目录",
    noToc: "该文章无目录",
    otherCategory: "其他",
  },
  en: {
    searchPlaceholder: "Search posts...",
    noResults: "No matching posts",
    prevPost: "Prev: ",
    nextPost: "Next: ",
    home: "Home",
    toggleSort: "Toggle sort",
    backHome: "Back home",
    showCategory: "Show categories",
    showToc: "Show contents",
    toggleTheme: "Toggle dark mode",
    backToTop: "Back to top",
    sidebarCategory: "Categories",
    sidebarTime: "Time",
    sidebarToc: "Contents",
    noToc: "No headings",
    otherCategory: "Other",
  },
}

export function getTexts(themeConfig) {
  const raw = themeConfig && themeConfig.language ? themeConfig.language : "zh"
  const lang = String(raw).toLowerCase()
  return TEXTS[lang] || TEXTS.zh
}
