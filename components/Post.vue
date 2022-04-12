<template>
  <section>
    <div class="post-head">
      <div class="post-info">
        <router-link to="/" :title="$description"> ← Home </router-link>
      </div>
      <h1 v-if="$page.title" class="post-title">
        {{ $page.title }}
      </h1>
    </div>
    <Content class="post-content" />
  </section>
</template>
<script>
export default {
 
}
</script>
<style lang="stylus" scope>
@require '../styles/index.styl'

.post-head
  position relative
  margin-bottom 4rem

.post-title
  text-align center
  font-size fontSize * 2
  margin-bottom 10px
  line-height 1


.post-content
    p
      text-indent 2rem
      text-align justify
    img
      margin-left -2rem
    a
      color linkColor
</style>
