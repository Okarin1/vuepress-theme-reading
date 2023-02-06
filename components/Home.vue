<template>
  <div class="timeline-wrapper">
      <ul class="timeline-content" v-for="item of sortedList" :key="item.category">
        <ul style="padding: 0">
          <h2 class="category">{{ item.category }}</h2>
          <li v-for="page of item.data" :key="page.title">
            <span class="date" v-if="page.frontmatter.date">{{ formatDateTitle(page.frontmatter.date) }}</span>
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
  },
  methods: {
    formatDateTitle(date) {
      return formatDate(date, "MM/dd");
    },
    go(path) {
      this.$router.push(path);
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
