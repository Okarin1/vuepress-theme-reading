
# vuepress-theme-reading

[![npm](https://img.shields.io/npm/v/vuepress-theme-reading.svg)](https://www.npmjs.com/package/vuepress-theme-reading)
[![LICENSE](https://img.shields.io/npm/l/vuepress-theme-reading.svg)](https://github.com/okarin1/vuepress-theme-reading/blob/master/LICENSE)

>A clean and minimalist theme for Vuepress !

![preview](https://s2.loli.net/2022/04/12/RBsjZ2nvgWYXcTh.png)

## Write in front

This is a purely for reading theme, does not support code highlighting, in addition the font is preset `cursive`, you can try to preview the [Demo](https://reading.okarin.cn) first before deciding whether to use this theme.


## Installation

```js
 $ npm install vuepress-theme-reading --save
```


## Use Theme in Vuepress

If you want to create a new blog using reading. You can follow these steps after setting up the [Vuepress](https://www.vuepress.cn/) environments.


When you successfully run a vuepress docs, you can modify the theme on `.vuepress/config.js` 


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

## MarkDown

- title 

Please provide a title at `.md` files that will be displayed on the front page, as well as in the article header.

```
---
title: This is Title
---

## H2

Here is the text, if you have to read what I wrote,
congratulations on wasting a precious minute of your life.

```

