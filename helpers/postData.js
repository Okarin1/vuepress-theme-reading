import { compareDate,formatDate } from "./utils"

// 过滤博客数据
export function filterPosts(posts) {
  posts = posts.filter(item => item.path !== "/")
  return posts
}

// 排序博客数据
export function sortPostsByDate(posts) {
  posts.sort((prev, next) => {
    return compareDate(prev, next)
  })
}

//分类博客数据

export function categoryPostsByDate(postList,fmt,noDate) {
  let dateArr = []
  const sortList = []
  postList.forEach((res, i) => {
    let postTime = postList[i].frontmatter.date
    let formatPostTime = formatDate(postTime, fmt)
    if (postTime) {
        //Order by fmt
      categoryPosts(postList,dateArr,sortList,formatPostTime,i)
    } else {
      //Other No Order
      categoryPosts(postList,dateArr,sortList,noDate,i)
    }
  })
  return sortList
}


export function categoryPosts(postList,dateArr,sortList,category,i){
  if (dateArr.indexOf(category) === -1) {
    sortList.push({
      date: category,
      data: [postList[i]],
    })
    dateArr.push(category)
  } else {
    sortList.forEach((currentValue, index) => {
      if (sortList[index].date == category) {
        sortList[index].data.push(postList[i])
      }
    })
  }
}