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
    <footer-bar v-show="isHome" />
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
    mounted() {
    let mode = window.localStorage.getItem("theme")
    if (mode == "dark") {
      let htmlTag = document.getElementsByTagName("html")[0]
      htmlTag.setAttribute("data-theme", "dark")
    }
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
</style>
