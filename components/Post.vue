<template>
  <section class="post-view">
    <div class="post-head">
      <div class="post-info">
        <router-link to="/" :title="$description"> ← Home </router-link>
        <time v-if="$page.frontmatter.date" :datetime="$page.frontmatter.date" :title="$page.frontmatter.date">
          {{ formatDateHeader($page.frontmatter.date) }}
        </time>
      </div>
      <h1 v-if="$page.title" class="post-title">
        {{ $page.title }}
      </h1>
      <p class="post-author" v-if="$page.frontmatter.author">
        {{ $page.frontmatter.author }}
        </p>
    </div>
    <Content class="post-content" />
    <div class="post-footer">
      <router-link v-if="PreNext.pre" :to="PreNext.pre.path">上一篇：{{ PreNext.pre.title }}</router-link>
      <router-link v-if="PreNext.next" :to="PreNext.next.path">下一篇：{{ PreNext.next.title }}</router-link>
    </div>
  </section>
</template>
<script>
import { formatDate } from "../helpers/utils";
import { filterPosts, sortPostsByDate } from "../helpers/postData";
export default {
  computed: {
    Posts() {
      let posts = this.$site.pages;
      posts = filterPosts(posts);
      sortPostsByDate(posts);
      return posts;
    },
    PreNext() {
      const posts = this.Posts.map((res) => {
        return res.title;
      });
      const index = posts.findIndex((element) => {
        return element == this.$page.title;
      });

      return { pre: this.Posts[index - 1], next: this.Posts[index + 1] };
    },
  },
  methods: {
    formatDateHeader(date) {
      return formatDate(date, "yyyy-MM-dd");
    },
  },
};
</script>
<style lang="stylus" scope>
@require '../styles/index.styl'

.post-view
    position relative

    .post-head
      position relative
      margin-bottom 4rem

    .post-info
      display flex
      flex-flow row nowrap
      justify-content space-between

    .post-title
      text-align center
      font-size fontSize * 2
      margin-bottom 10px
      line-height 1

    .post-author
      text-align center
      font-size fontSize * 0.8

    .post-content
        p
          text-indent 2rem
          text-align justify
          img
            margin-left -2rem

        a
          color linkColor
    .post-footer
      margin-top 4rem
      display flex
      justify-content space-between
      @media (max-width: 600px)
          flex-flow column wrap
</style>
