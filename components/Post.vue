<template>
  <section class="post-view">
    <div class="post-head">
      <div class="post-info">
        <router-link to="/" :title="$description">Home</router-link>
        <time v-if="$page.frontmatter.date" :datetime="$page.frontmatter.date" :title="$page.frontmatter.date">
          {{ formatDateHeader($page.frontmatter.date) }}
        </time>
      </div>
      <h1 v-if="$page.title" class="post-title">
        {{ $page.title }}
      </h1>
      <p class="post-author" v-if="$page.frontmatter.author">{{ $page.frontmatter.author }}</p>
    </div>
    <Content class="post-content" />
    <div class="post-footer">
      <router-link v-if="PreNext.pre" :to="PreNext.pre.path">上一篇：{{ PreNext.pre.title }}</router-link>
      <router-link v-if="PreNext.next" :to="PreNext.next.path">下一篇：{{ PreNext.next.title }}</router-link>
    </div>
    <reader-controls></reader-controls>
  </section>
</template>
<script>
import { formatDate } from "../helpers/utils"
import ReaderControls from "./ReaderControls.vue"
export default {
  components: { ReaderControls },
  props: {
    orderList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    PreNext() {
      const posts = this.orderList.map((res) => {
        return res.title
      })
      const index = posts.findIndex((element) => {
        return element == this.$page.title
      })

      return { pre: this.orderList[index - 1], next: this.orderList[index + 1] }
    },
  },
  methods: {
    formatDateHeader(date) {
      return formatDate(date, "yyyy-MM-dd")
    },
  },
}
</script>
<style lang="stylus" scope>
@require '../styles/index.styl'
</style>
