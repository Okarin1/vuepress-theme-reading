<template>
  <div class="list-view">
    <ul class="list" v-for="item of orderList" :key="item.key">
      <li>
        <router-link :to="item.path" class="item-title">
          {{ item.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    orderList() {
      // Order by year
      let postList = this.$site.pages.filter((item) => item.path !== "/");
      return postList;
    },
  },
};
</script>
<style lang="stylus" scoped></style>
