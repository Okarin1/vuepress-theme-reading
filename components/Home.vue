<template>
  <div class="timeline-wrapper">
    <ul class="timeline-content" v-for="item of orderList" :key="item.date">
      <h2 class="year">{{ item.date }}</h2>
      <li v-for="page of item.data" :key="page.title">
        <span class="date" v-if="page.frontmatter.date">{{ formatDateTitle(page.frontmatter.date) }}</span>
        <router-link :to="page.path">{{ page.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { formatDate } from "../helpers/utils";
import { filterPosts, sortPostsByDate, categoryPostsByDate } from "../helpers/postData";
export default {
  computed: {
    Posts() {
      let posts = this.$site.pages;
      posts = filterPosts(posts);
      sortPostsByDate(posts);
      return posts;
    },
    orderList() {
      let postList = this.Posts;
      const sortedList = categoryPostsByDate(postList, "yyyy", "Other");
      return sortedList;
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
.year
  margin-left -1rem
  margin-bottom 1rem
</style>
