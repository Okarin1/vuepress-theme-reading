<template>
  <div class="readerControls-item">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.readerControls-item
  cursor pointer
  background-color #fff
  box-shadow 0 8px 20px 0px rgba(146, 143, 143, 0.3)
  width 48px
  height 48px
  transition background-color .2s ease-in-out
  border-radius 24px
  line-height 48px
  text-align center
  position relative;
  opacity 0.7
  &:hover
    opacity 1
.readerControls-item:not(:first-child)
  margin-top 24px
</style>
