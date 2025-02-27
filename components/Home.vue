<template>
  <div class="timeline-wrapper">
    <ul class="timeline-content" v-for="(item, index) of sortedList" :key="item.category + index">
      <ul style="padding: 0">
        <h2 class="category">{{ item.category }}</h2>
        <li v-for="page of item.data" :key="page.path">
          <span class="date" v-if="showDate && page.frontmatter.date">{{ formatDateTitle(page.frontmatter.date) }}</span>
          <router-link :to="page.path">{{ page.title }}</router-link>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script>
import { formatDate } from "../helpers/utils";
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
  methods: {
    formatDateTitle(date) {
      return formatDate(date, "MM/dd");
    },
    go(path) {
      this.$router.push(path);
    },
  },
  computed: {
    category() {
      let sortMethod = this.$themeConfig.sortMethod || "date";
      return sortMethod == "date";
    },
    showDate() {
      return this.categoryByDate;
    },
  },
};
</script>
<style lang="stylus" scoped>
.category
  margin-left -1rem
  margin-bottom 1rem
.date
  margin-right 1rem
</style>
