<template>
  <div class="all-content">
    <main class="reading-content">
      <div class="wrapper">
        <header class="header">
          <div v-show="isHome">
            <p class="home-title">{{ $site.title }}</p>
            <p class="home-description">{{ $site.description }}</p>
          </div>
        </header>
        <home v-if="isHome" />
        <post v-else />
      </div>
    </main>
    <footer-bar />
  </div>
</template>

<script>
import Home from "../components/Home"
import Post from "../components/Post"
import FooterBar from "../components/FooterBar"

export default {
  components: {
    Home,
    Post,
    FooterBar,
  },
  computed: {
    isHome() {
      return this.$page.path === "/"
    },
  },
}
</script>
<style lang="stylus" scoped>
@require '../styles/index.styl'
.all-content
    display flex
    flex-direction column
    height 100vh

.reading-content
  padding 30px 0
  flex 1 0 auto

  .wrapper
    max-width 640px
    margin 0 auto
    padding: 0 2rem

.header
  margin 40px 0
  line-height 0.5
  padding-left 0.25rem

  .home-title
    font-size fontSize * 2
    font-weight 1000

    
</style>
