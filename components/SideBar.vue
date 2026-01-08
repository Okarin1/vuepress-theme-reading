<template>
  <div>
    <ul class="side-bar">
      <h2>{{ isHome ? (categoryByDate ? texts.sidebarTime : texts.sidebarCategory) : texts.sidebarToc }}</h2>
      <template v-if="isHome">
        <li v-for="(item, index) in categories" :key="item.category" @click="categoryClick(item.category, index)">
          <a class="side-link" :class="{ active: index == currentIndex }">{{ item.category }} ({{ item.data.length }})</a>
        </li>
      </template>
      <template v-else>
        <li v-for="(item, index) in headers" :key="item.title" @click="sideClick(item.slug, index)">
        <a class="side-link" :href="`#${item.slug}`" :class="{ active: index == currentIndex }">{{ item.title }}</a>
      </li>
        <li v-if="!headers">{{ texts.noToc }}</li>
      </template>
    </ul>
  </div>
</template>

<script>
import { getTexts } from "../helpers/i18n"
export default {
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    categoryByDate: {
      type: Boolean,
      default: true
    },
    showCategories: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      headers: [],
      currentIndex: 0
    }
  },
  mounted() {
    this.headers = this.getHeaders()
  },
  watch: {
    $route() {
      this.headers = this.getHeaders()
      this.currentIndex = 0
    },
  },
  computed: {
    texts() {
      return getTexts(this.$themeConfig)
    },
    isHome() {
      return this.$page.path === "/"
    }
  },
  methods: {
    sideClick(item, index) {
      this.currentIndex = index
      document.getElementById(item).scrollIntoView()
    },
    categoryClick(category, index) {
      this.currentIndex = index
      const elements = document.getElementsByClassName('category')
      for (let el of elements) {
        if (el.textContent === category) {
          el.scrollIntoView({ behavior: 'smooth' })
          break
        }
      }
    },
    getHeaders(){
      return this.$page.headers
    }
  },
}
</script>

<style lang="stylus" scoped>
.side-bar
    width: 20vw;
    overflow: visible;
    position: fixed;
    top 0;
    bottom 2rem;
    right 0
    list-style none;
    font-size 15px;
    display flex;
    flex-direction column;
    max-height 50vh
    align-items: flex-start
    @media screen and (max-width: 1300px)
        width 12vw
    @media screen and (max-width: 1024px)
        display none
    @media only screen and (max-width: 768px)
        display none
    
    li
        cursor pointer
        width 100%
        
    .side-link
        cursor pointer
        &:hover
            color var(--theme-color)

.no-results
    color var(--text-color-light)
    font-size 14px
    padding 0.5rem 0
    text-align center
</style>
