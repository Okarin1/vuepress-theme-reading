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
        <home :sortedList="sortedList" :categoryByDate="categoryByDate" v-if="isHome" />
        <post :orderList="orderList" v-else />
      </div>
      <reader-controls v-show="isHome" :sortedList="sortedList" :categoryByDate="categoryByDate"></reader-controls>
    </main>
    <footer-bar v-show="isHome" />
  </div>
</template>

<script>
import Home from "../components/Home";
import Post from "../components/Post";
import FooterBar from "../components/FooterBar";
import { filterPosts, categoryPostsByDate, categoryPostsByCategory } from "../helpers/postData";
import { getTexts } from "../helpers/i18n";
import ReaderControls from "../components/ReaderControls.vue";
export default {
  components: {
    Home,
    Post,
    FooterBar,
    ReaderControls,
  },
  mounted() {
    switch (this.sortMethed) {
      case "date":
        this.categoryByDate = true;
        break;
      case "category":
        this.categoryByDate = false;
        break;
      default:
        this.categoryByDate = true;
        break;
    }
    let mode = window.localStorage.getItem("theme");
    if (mode == "dark") {
      let htmlTag = document.getElementsByTagName("html")[0];
      htmlTag.setAttribute("data-theme", "dark");
    }
  },
  data() {
    return {
      categoryByDate: true,
    };
  },
  computed: {
    texts() {
      return getTexts(this.$themeConfig);
    },
    isHome() {
      return this.$page.path === "/";
    },
    posts() {
      let posts = this.$site.pages;
      posts = filterPosts(posts);
      return posts;
    },
    sortedList() {
      let postList = this.posts;
      if (this.categoryByDate) {
        const sortedList = categoryPostsByDate(postList, "yyyy", this.texts.otherCategory);
        return sortedList;
      } else {
        const sortedList = categoryPostsByCategory(postList, this.texts.otherCategory);
        return sortedList;
      }
    },
    orderList() {
      const list = [];
      this.sortedList.forEach((item) => {
        list.push(...item.data);
      });
      return list;
    },
    sortMethed() {
      let sortMethod = this.$themeConfig.sortMethod || "date";
      return sortMethod;
    },
  },
  methods: {
    toggleCategory() {
      this.categoryByDate = !this.categoryByDate;
    },
  },
};
</script>
<style lang="stylus" scoped>
@require '../styles/index.styl'
</style>
