<template>
  <footer class="footer">
    <div>
      <ul>
        <li>
          <a :href="authorLink" rel="noopener" target="_blank">{{ author }}</a>
        </li>
        <li>
          Vuepress Theme |
          <a href="https://github.com/Okarin1/vuepress-theme-reading" rel="noopener" target="_blank">Reading</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    author() {
      return this.$themeConfig.author || "";
    },
    authorLink() {
      return this.$themeConfig.authorLink || "";
    },
  },
};
</script>
<style lang="stylus" scoped>
.footer
  margin-top 1rem
  ul
    padding 0
    li
      list-style none
</style>
