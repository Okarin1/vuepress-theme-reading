<template>
  <section class="post-view">
    <div class="post-head">
      <div class="post-info">
        <router-link to="/" :title="$description"> ← Home </router-link>
        <time
          v-if="$page.frontmatter.date"
          :datetime="$page.frontmatter.date"
          :title="$page.frontmatter.date"
        >
          {{ formatDate($page.frontmatter.date) }}
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
  </section>
</template>
<script>
export default {
  methods: {
    formatDate(date) {
      let formatDate = new Date(date);
      let year = formatDate.getFullYear();
      let mouth = formatDate.getMonth() + 1;
      let day = formatDate.getDate();
      function padLeftZero(str) {
        return (str = str < 10 ? "0" + str : str);
      }
      return `${year}/${padLeftZero(mouth)}/${padLeftZero(day)}`;
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
</style>
