<template>
  <div class="list-view">
    <ul class="list" v-for="item of orderList" :key="item.key">
      <h2 class="list-year">{{ item.date }}</h2>
      <li v-for="page of item.children" :key="page.title" class="list-item">
        <span v-if="page.frontmatter.date">{{ formatDate(page.frontmatter.date) }}</span>
        <router-link :to="page.path" class="item-title">
          {{ page.title }}
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
      let postList = this.$site.pages
        .filter((item) => item.path !== "/")
        .sort((a, b) => {
          return getFullTime(b.frontmatter.date) - getFullTime(a.frontmatter.date)
        })
  
      // Get full year
      function getFullYear(time) {
        return time ? new Date(time).getFullYear() : 0
      }

      //Get full time
      function getFullTime(time) {
        return time ? new Date(time) : 0
      }
      //Grouped by year
      let dateArr = []
      const sortList = []

      postList.forEach((res, i) => {
        if (postList[i].frontmatter.date) {
          if (dateArr.indexOf(getFullYear(postList[i].frontmatter.date)) === -1) {
            sortList.push({
              date: getFullYear(postList[i].frontmatter.date),
              children: [postList[i]],
            })
            dateArr.push(getFullYear(postList[i].frontmatter.date))
          } else {
            sortList.forEach((currentValue, index) => {
              if (sortList[index].date == getFullYear(postList[i].frontmatter.date)) {
                sortList[index].children.push(postList[i])
              }
            })
          }
        } else {
          //Other No Order
          if (dateArr.indexOf("Other") === -1) {
            sortList.push({
              date: "Other",
              children: [postList[i]],
            })
            dateArr.push("Other")
          } else {
            sortList.forEach((currentValue, index) => {
              if (sortList[index].date == "Other") {
                sortList[index].children.push(postList[i])
              }
            })
          }
        }
      })

      return sortList
    },
  },
  methods: {
    //format time
    formatDate(date) {
      let formatDate = new Date(date)
      let year = formatDate.getFullYear()
      let mouth = formatDate.getMonth() + 1
      let day = formatDate.getDate()
      function padLeftZero(str) {
        return (str = str < 10 ? "0" + str : str)
      }
      return `${padLeftZero(mouth)}/${padLeftZero(day)}`
    },
  },
}
</script>
<style lang="stylus" scoped>
.list-year
  margin-left -2rem
  margin-bottom 1rem
</style>
