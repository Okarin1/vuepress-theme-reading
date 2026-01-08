module.exports = (themeConfig, ctx) => {
  return {
    extendPageData(page) {
      const raw = page._strippedContent || page._content || page.content || "";
      const text = typeof raw === "string" ? raw : "";
      page.searchContent = text
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    },
  };
};
