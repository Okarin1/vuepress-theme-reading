<template>
  <div>
    <ul class="side-bar">
      <h2>目录</h2>
      <li v-for="(item, index) in headers" :key="item.title" @click="sideClick(item.slug, index)">
        <a class="side-link" :href="`#${item.slug}`" :class="{ active: index == currentIndex }">{{ item.title }}</a>
      </li>
      <li v-if="!headers">该文章无目录</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [],
      currentIndex: 0,
    }
  },
  mounted() {
    this.headers = this.getHeaders()
  },
  watch: {
    $route() {
      this.headers = this.getHeaders()
    },
  },
  methods: {
    sideClick(item, index) {
      this.currentIndex = index
      document.getElementById(item).scrollIntoView()
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
</style>
