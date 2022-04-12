
# vuepress-theme-simple

>A clean and minimalist theme for Vuepress !

![preview](https://s2.loli.net/2022/04/12/RBsjZ2nvgWYXcTh.png)

## Write in front

This is a purely for reading theme, does not support code highlighting, in addition the font is preset `cursive`, you can try to preview the demo first before deciding whether to use this theme.

这是一个纯粹的阅读主题，不支持代码高亮，另外字体预设为楷体，你可以先试着预览一下我的Demo，再决定是否使用这个主题。

## Installation

```js
 $ npm install vuepress-theme-reading --save
```


## Use Theme in Vuepress

If you want to create a new blog using reading. You can follow these steps after setting up the [Vuepress](https://www.vuepress.cn/) environments.

如果你想使用 reading主题 创建一个新的博客。你可以在设置好 [Vuepress](https://www.vuepress.cn/) 环境后按照以下步骤进行。

When you successfully run a vuepress docs, you can modify the theme on `.vuepress/config.js` 

当你成功运行了vuepress 文档，你可以在`.vuepress/config.js`中修改主题。

```js
module.exports = {
  theme: 'reading',
}
```
## Theme Config

Some additional settings in `.vuepress/config.js` 

```js
module.exports = {
    title: 'The Title', // will display on the title
    description: 'Your own description', // will display under the title
    theme: 'reading',
    themeConfig: {
      author:'Your Name',// will display on the footer
      authorLink: 'https://xxx.com', //click your name to this site
    }
  }
```


## About Post

All your `.md` files except `README.md` file will be displayed on the Home page. 

But to prevent errors, please **provide an empty `README.md` file.**

除了 `README.md` 文件，你所有的 `.md` 文件都将显示在首页上。

但是为了防止错误，请**提供一个空的`README.md'文件。**

## MarkDown

- title 

Please provide a title at `.md` files that will be displayed on the front page, as well as in the article header.

请在 `.md` 文件中提供一个标题，该标题将显示在首页，以及文章头部。

```
---
title: This is Title
---

## H2

Here is the text, if you have to read what I wrote,
congratulations on wasting a precious minute of your life.

```

