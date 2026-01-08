<template>
  <div class="readerControls-item" :data-tip="tip">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    tip: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="stylus" scoped>
.readerControls-item
  cursor pointer
  background-color #fff
  box-shadow 0 8px 20px 0px rgba(146, 143, 143, 0.3)
  width 48px
  height 48px
  transition background-color .2s ease-in-out, transform .2s ease-in-out, box-shadow .2s ease-in-out
  border-radius 50%
  line-height 56px
  text-align center
  position relative;
  opacity 0.95
  &:hover
    opacity 1
    transform translateY(-2px)
    box-shadow 0 16px 36px rgba(0, 0, 0, 0.12)
  &:after
    content attr(data-tip)
    position absolute
    left 60px
    top 50%
    transform translateY(-50%)
    background var(--bg-color)
    color var(--text-color)
    border 1px solid var(--border-color)
    padding 4px 8px
    font-size 12px
    border-radius 6px
    white-space nowrap
    opacity 0
    pointer-events none
    transition opacity .2s ease-in-out, transform .2s ease-in-out
  &:hover:after
    opacity 1
    transform translateY(-50%) translateX(-2px)
.readerControls-item:not(:first-child)
  margin-top 24px
</style>
