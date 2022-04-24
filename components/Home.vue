<template>
  <div class="list-view">
    <ul class="list" v-for="item of orderList" :key="item.key">
      <h2 class="list-year">{{ item.date }}</h2>
      <li v-for="page of item.data" :key="page.title" class="list-item">
        <span class="item-date" v-if="page.frontmatter.date">
          {{ formatDateTitle(page.frontmatter.date) }}
        </span>
        <router-link :to="page.path" class="item-title">
          {{ page.title }}
        </router-link>
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
      const sortList = categoryPostsByDate(postList, "yyyy", "Other");
      return sortList;
    },
  },
  methods: {
    //format time
    formatDateTitle(date) {
      return formatDate(date, "MM/dd");
    },
  },
};
</script>
<style lang="stylus" scoped>
.list-year
  margin-left -2rem
  margin-bottom 1rem
</style>
