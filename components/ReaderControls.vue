<template>
  <div>
    <div class="readerControls">
      <control-item :tip="homeTip" @click.native="backToHome()">
        <button class="icon home" :aria-label="homeTip"></button>
      </control-item>
      <control-item :tip="catalogTip" @click.native="showSide()">
        <button class="icon catalog" :aria-label="catalogTip"></button>
      </control-item>
      <control-item :tip="themeTip" @click.native="themeSwitch()">
        <button class="icon dark" :aria-label="themeTip"></button>
      </control-item>
      <control-item :tip="topTip" @click.native="backToTop()">
        <button class="icon top" :aria-label="topTip"></button>
      </control-item>
    </div>
    <side-bar v-show="isShow" :categories="sortedList" :categoryByDate="categoryByDate"></side-bar>
  </div>
</template>

<script>
import ControlItem from "./ControlItem.vue"
import SideBar from "./SideBar.vue"
import { getTexts } from "../helpers/i18n"
export default {
  components: { ControlItem, SideBar },
  name: "ThemeSwitcher",
  data() {
    return {
      isLight: true,
      isShow: false
    }
  },
  props: {
    sortedList: {
      type: Array,
      default: () => []
    },
    categoryByDate: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    themeSwitch() {
      if (typeof window === 'undefined' || !window) return
      this.isLight = !this.isLight
      let htmlTag = document.getElementsByTagName("html")[0]
      if (this.isLight) {
        window.localStorage.setItem("theme", "light")
        htmlTag.setAttribute("data-theme", "light")
      } else {
        window.localStorage.setItem("theme", "dark")
        htmlTag.setAttribute("data-theme", "dark")
        this.$emit("themeMode", "dark")
      }
    },
    showSide() {
      if (typeof window === 'undefined' || !window) return
      this.isShow = !this.isShow
      window.localStorage.setItem('sidebarState', this.isShow ? 'open' : 'closed')
    },
    backToHome() {
      if (this.isHome) {
        this.$parent.toggleCategory()
      } else {
        this.$router.push("/")
      }
    },
    backToTop() {
      window.scrollTo(0, 0)
    },
  },
  computed:{
    texts() {
      return getTexts(this.$themeConfig)
    },
    isHome(){
      return this.$page.path === "/";
    },
    homeTip() {
      return this.isHome ? this.texts.toggleSort : this.texts.backHome
    },
    catalogTip() {
      return this.isHome ? this.texts.showCategory : this.texts.showToc
    },
    themeTip() {
      return this.texts.toggleTheme
    },
    topTip() {
      return this.texts.backToTop
    }
  },
  watch: {
    '$route.path'() {
      if (typeof window !== 'undefined' && window) {
        this.isShow = window.localStorage.getItem('sidebarState') !== 'closed'
      }
    }
  },
  mounted() {
    if (typeof window !== 'undefined' && window) {
      let mode = window.localStorage.getItem("theme")
      if (mode == "dark") {
        this.isLight = false
      }
      
      if (!window.localStorage.getItem('sidebarState')) {
        window.localStorage.setItem('sidebarState', 'open')
      }
      this.isShow = window.localStorage.getItem('sidebarState') !== 'closed'
    }
  },
}
</script>

<style lang="stylus" scope>
  .readerControls
    transition transform 0.25s ease-in-out 0s, opacity 0.25s ease-in-out 0s
    transform translateY(0px)
    opacity 1
    width 18vw
    overflow visible
    position fixed
    bottom 2rem
    right 2rem
    list-style none
    font-size 12px
    display flex
    flex-direction column
    align-items flex-start
    @media screen and (max-width: 1300px)
      width 10vw
    @media screen and (max-width: 1024px)
      display none
    @media only screen and (max-width: 768px)
      display none
    @media only print 
      display none

    button
      background none
      border 0
      padding 0
      text-decoration none
      cursor pointer
    .icon
      width 22px
      height 22px
      background-size 22px 22px
      position absolute
      left 50%
      top 50%
      margin-top -11px
      margin-left -11px
      transition background-image .2s ease-in-out
      opacity 0.75
    .home
      background url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPScjNjY2JyBzdHJva2Utd2lkdGg9JzEuOCcgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJz48cGF0aCBkPSdNMyAxMWw5LTcgOSA3Jy8+PHBhdGggZD0nTTUgMTB2MTBoNXYtNmg0djZoNVYxMCcvPjwvc3ZnPg==") no-repeat
    .catalog
      background url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPScjNjY2JyBzdHJva2Utd2lkdGg9JzEuOCcgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJz48bGluZSB4MT0nNScgeTE9JzYuNScgeDI9JzE5JyB5Mj0nNi41Jy8+PGxpbmUgeDE9JzUnIHkxPScxMicgeDI9JzE5JyB5Mj0nMTInLz48bGluZSB4MT0nNScgeTE9JzE3LjUnIHgyPScxOScgeTI9JzE3LjUnLz48L3N2Zz4=") no-repeat
    .dark
      background url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPScjNjY2JyBzdHJva2Utd2lkdGg9JzEuOCcgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJz48cGF0aCBkPSdNMTQgNC41YTcuNSA3LjUgMCAxIDAgNS41IDEzYy00LjUuNS04LjUtMy41LTgtOCAuMy0yLjUgMS41LTQuMiAyLjUtNXonLz48L3N2Zz4=") no-repeat
    .top
      background url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPScjNjY2JyBzdHJva2Utd2lkdGg9JzEuOCcgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJz48cGF0aCBkPSdNNiAxMmw2LTYgNiA2Jy8+PHBhdGggZD0nTTYgMThoMTInLz48L3N2Zz4=") no-repeat
    .readerControls-item:hover
      .home
        background url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPScjMDAwJyBzdHJva2Utd2lkdGg9JzEuOCcgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJz48cGF0aCBkPSdNMyAxMWw5LTcgOSA3Jy8+PHBhdGggZD0nTTUgMTB2MTBoNXYtNmg0djZoNVYxMCcvPjwvc3ZnPg==") no-repeat
      .catalog
        background url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPScjMDAwJyBzdHJva2Utd2lkdGg9JzEuOCcgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJz48bGluZSB4MT0nNScgeTE9JzYuNScgeDI9JzE5JyB5Mj0nNi41Jy8+PGxpbmUgeDE9JzUnIHkxPScxMicgeDI9JzE5JyB5Mj0nMTInLz48bGluZSB4MT0nNScgeTE9JzE3LjUnIHgyPScxOScgeTI9JzE3LjUnLz48L3N2Zz4=") no-repeat
      .dark
        background url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPScjMDAwJyBzdHJva2Utd2lkdGg9JzEuOCcgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJz48cGF0aCBkPSdNMTQgNC41YTcuNSA3LjUgMCAxIDAgNS41IDEzYy00LjUuNS04LjUtMy41LTgtOCAuMy0yLjUgMS41LTQuMiAyLjUtNXonLz48L3N2Zz4=") no-repeat
      .top
        background url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPScjMDAwJyBzdHJva2Utd2lkdGg9JzEuOCcgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJz48cGF0aCBkPSdNNiAxMmw2LTYgNiA2Jy8+PHBhdGggZD0nTTYgMThoMTInLz48L3N2Zz4=") no-repeat
</style>
