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
        <home :sortedList="sortedList" v-if="isHome" />
        <post :orderList="orderList" v-else />
      </div>
      <reader-controls v-if="isHome"></reader-controls>
    </main>
    <footer-bar v-show="isHome" />
  </div>
</template>

<script>
import Home from "../components/Home";
import Post from "../components/Post";
import FooterBar from "../components/FooterBar";
import { filterPosts, categoryPostsByDate, categoryPostsByCategory } from "../helpers/postData";
import ReaderControls from "../components/ReaderControls.vue"
export default {
  components: {
    Home,
    Post,
    FooterBar,
    ReaderControls
  },
  mounted() {
    let category = window.localStorage.getItem("category");
    if(category == 'date'){
      this.categoryByDate = true
    }
    let mode = window.localStorage.getItem("theme");
    if (mode == "dark") {
      let htmlTag = document.getElementsByTagName("html")[0];
      htmlTag.setAttribute("data-theme", "dark");
    }
  },
  data(){
    return {
      categoryByDate:true
    }
  },
  computed: {
    isHome() {
      return this.$page.path === "/";
    },
    posts() {
      let posts = this.$site.pages
      posts = filterPosts(posts)
      return posts
    },
    sortedList() {
      let postList = this.posts
      if(this.categoryByDate){
        const sortedList = categoryPostsByDate(postList, "yyyy", "Other")
        return sortedList
      }else{
        const sortedList = categoryPostsByCategory(postList, "其他")
        return sortedList
      }
    },
    orderList(){
      const list = []
      this.sortedList.forEach((item)=>{
         list.push(...item.data) 
      })
      return list
    }
  },
  methods:{
    toggleCategory(){
      this.categoryByDate = !this.categoryByDate
      if (this.categoryByDate) {
        window.localStorage.setItem("category", "date")
      } else {
        window.localStorage.setItem("category", "category")
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
@require '../styles/index.styl'
</style>
