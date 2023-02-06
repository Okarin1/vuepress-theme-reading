<template>
  <div>
    <div class="readerControls">
      <control-item v-show="!isHome" @click.native="backToHome()">
        <button class="icon home"></button>
      </control-item>
      <control-item @click.native="showSide()">
        <button class="icon catalog"></button>
      </control-item>
      <control-item @click.native="themeSwitch()">
        <button class="icon dark"></button>
      </control-item>
      <control-item @click.native="backToTop()">
        <button class="icon top"></button>
      </control-item>
    </div>
    <side-bar v-show="isShow"></side-bar>
  </div>
</template>

<script>
import ControlItem from "./ControlItem.vue"
import SideBar from "./SideBar.vue"
export default {
  components: { ControlItem, SideBar },
  name: "ThemeSwitcher",
  data() {
    return {
      isLight: true,
      isShow: false,
    }
  },

  methods: {
    themeSwitch() {
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
      if(this.isHome){
        this.$parent.toggleCategory()
      }
      else{
        this.isShow = !this.isShow
      }
    },
    backToHome() {
      this.$router.push("/")
    },
    backToTop() {
      window.scrollTo(0, 0)
    },
  },
  computed:{
    isHome(){
      return this.$page.path === "/";
    }
  },
  mounted() {
    let mode = window.localStorage.getItem("theme")
    if (mode == "dark") {
      this.isLight = false
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
  right 0
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

  button
    background none
    border 0
    padding 0
    text-decoration none
    cursor pointer
  .icon
    width 24px
    height 24px
    background-size 100%
    position absolute
    left 50%
    top 50%
    margin-top -12px
    margin-left -12px
    transition background-image .2s ease-in-out
  .home
    background url(https://s1.ax1x.com/2022/06/22/jpK6pt.png) no-repeat
  .catalog
    background url(https://s1.ax1x.com/2022/06/22/jpMyE4.png) no-repeat
  .dark
    background url(https://s1.ax1x.com/2022/06/22/jpMXxP.png) no-repeat
  .top
    background url(https://s1.ax1x.com/2022/06/22/jpQlGR.png) no-repeat
</style>
