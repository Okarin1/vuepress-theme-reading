<template>
  <div class="timeline-wrapper">
    <div class="search-bar">
      <input
        v-model.trim="searchQuery"
        class="search-input"
        type="search"
        :placeholder="texts.searchPlaceholder"
      />
    </div>
    <ul class="timeline-content" v-for="(item, index) of filteredList" :key="item.category + index">
      <ul style="padding: 0">
        <h2 class="category">{{ item.category }}</h2>
        <li v-for="page of item.data" :key="page.path" class="post-item">
          <span class="date" v-if="showDate && page.frontmatter.date">{{ formatDateTitle(page.frontmatter.date) }}</span>
          <router-link :to="page.path">{{ page.title }}</router-link>
          <p v-if="showPreview(page)" class="post-preview" v-html="getPreviewHtml(page)"></p>
        </li>
      </ul>
    </ul>
    <div v-if="!hasResults" class="no-results">{{ texts.noResults }}</div>
  </div>
</template>

<script>
import { formatDate } from "../helpers/utils";
import { getTexts } from "../helpers/i18n";
export default {
  props: {
    sortedList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    categoryByDate: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    formatDateTitle(date) {
      return formatDate(date, "MM/dd");
    },
    go(path) {
      this.$router.push(path);
    },
    normalizeText(text) {
      return (text || "").toString().replace(/\s+/g, " ").trim();
    },
    getPreviewHtml(page) {
      const content = this.normalizeText(page.searchContent || "");
      const query = this.searchQuery.trim();
      if (!content) {
        return "";
      }
      const lower = content.toLowerCase();
      if (!query) {
        const plain = content.slice(0, 120);
        return this.escapeHtml(plain) + (content.length > 120 ? "..." : "");
      }
      const lowerQuery = query.toLowerCase();
      const hitIndex = lower.indexOf(lowerQuery);
      const start = hitIndex === -1 ? 0 : Math.max(0, hitIndex - 30);
      const end = hitIndex === -1
        ? Math.min(content.length, 120)
        : Math.min(content.length, hitIndex + lowerQuery.length + 60);
      const prefix = start > 0 ? "..." : "";
      const suffix = end < content.length ? "..." : "";
      const slice = content.slice(start, end);
      const highlighted = this.highlightQuery(slice, query);
      return prefix + highlighted + suffix;
    },
    escapeHtml(text) {
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    },
    escapeRegExp(text) {
      return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    },
    highlightQuery(text, query) {
      const safeText = this.escapeHtml(text);
      const safeQuery = this.escapeRegExp(query);
      if (!safeQuery) {
        return safeText;
      }
      const re = new RegExp(safeQuery, "ig");
      return safeText.replace(re, (match) => `<strong>${match}</strong>`);
    },
  },
  computed: {
    texts() {
      return getTexts(this.$themeConfig);
    },
    category() {
      let sortMethod = this.$themeConfig.sortMethod || "date";
      return sortMethod == "date";
    },
    showDate() {
      return this.categoryByDate;
    },
    showPreview() {
      return (page) => {
        return this.searchQuery.trim().length > 0 && !!(page.searchContent || "").trim();
      };
    },
    filteredList() {
      const query = this.searchQuery.trim().toLowerCase();
      if (!query) {
        return this.sortedList;
      }
      return this.sortedList
        .map((item) => {
          const categoryText = (item.category || "").toString().toLowerCase();
          const categoryMatch = categoryText.includes(query);
          const data = categoryMatch
            ? item.data
            : item.data.filter((page) => {
                const pageTitle = (page.title || "").toLowerCase();
                const frontTitle = page.frontmatter && page.frontmatter.title
                  ? page.frontmatter.title.toLowerCase()
                  : "";
                const content = (page.searchContent || page._strippedContent || page._content || page.content || "")
                  .toString()
                  .toLowerCase();
                return (
                  pageTitle.includes(query) ||
                  frontTitle.includes(query) ||
                  content.includes(query)
                );
              });
          return {
            category: item.category,
            data,
          };
        })
        .filter((item) => item.data.length > 0);
    },
    hasResults() {
      return this.filteredList.length > 0;
    },
  },
};
</script>
<style lang="stylus" scoped>
.search-bar
  margin 0 0 1rem 0
.search-input
  width 100%
  max-width 28rem
  padding 0.5rem 0.75rem
  border 1px solid var(--border-color)
  border-radius 6px
  background var(--bg-color)
  color var(--text-color)
  font-size 14px
  outline none
  &::-webkit-search-cancel-button
    -webkit-appearance none
    appearance none
  &:focus
    border-color var(--theme-color)
.post-item
  margin-bottom 0.75rem
.post-preview
  margin 0.35rem 0 0 0
  color var(--text-color-light)
  font-size 13px
  line-height 1.5
.no-results
  color var(--text-color-light)
  font-size 14px
  padding 0.5rem 0
.category
  margin-left -1rem
  margin-bottom 1rem
.date
  margin-right 1rem
</style>
