import { compareDate,compareCategory,formatDate } from "./utils"

// 过滤博客数据
export function filterPosts(posts) {
  posts = posts.filter((item) => item.path !== "/")
  return posts
}

// 按Date排序博客数据
export function sortPostsByDate(posts) {
  posts.sort((prev, next) => {
    return compareDate(prev, next)
  })
}

// 按分类博客数据
export function sortPostsByCategory(posts) {
  posts.sort((prev, next) => {
    return compareCategory(prev, next)
  })
}


// 按date分类博客数据
export function categoryPostsByDate(postList, fmt, noDate) {
  sortPostsByDate(postList)
  let dateArr = []
  const sortList = []
  postList.forEach((res, i) => {
    let postTime = postList[i].frontmatter.date
    let formatPostTime = formatDate(postTime, fmt)
    if (postTime) {
      //Order by fmt
      categoryPosts(postList, dateArr, sortList, formatPostTime, i)
    } else {
      //Other No Order
      categoryPosts(postList, dateArr, sortList, noDate, i)
    }
  })
  return sortList
}

// 按category分类博客数据
export function categoryPostsByCategory(postList,noCategory) {
  sortPostsByCategory(postList)
  let categoryArr = []
  const sortList = []
  postList.forEach((res, i) => {
    let postCategory = postList[i].frontmatter.category
    if (postCategory) {
      //Order by fmt
      categoryPosts(postList, categoryArr, sortList, postCategory, i)
    } else {
      //Other No Order
      categoryPosts(postList, categoryArr, sortList, noCategory, i)
    }
  })
  sortList.forEach(item=>{
    sortPostsByDate(item.data)
  })
  return sortList
}

// 分类函数
export function categoryPosts(postList, cateArr, sortList, category, i) {
  if (cateArr.indexOf(category) === -1) {
    sortList.push({
      category,
      data: [postList[i]],
    })
    cateArr.push(category)
  } else {
    sortList.forEach((currentValue, index) => {
      if (sortList[index].category == category) {
        sortList[index].data.push(postList[i])
      }
    })
  }
}
