<!--
 * @Author: 姜彦汐
 * @Date: 2020-12-04 13:26:18
 * @LastEditors: 姜彦汐
 * @LastEditTime: 2021-01-05 11:01:20
 * @Description: 
 * @Contact: jiangyanxi@live.com
 * @FilePath: /egg-view-handlebars/README.md
-->
# egg-view-handlebars
## 安装

```bash
$ npm i egg-view-handlebars --save
# or
$ yarn add egg-view-handlebars
```

## 依赖说明

### 依赖的 egg 版本

egg-view-handlebars 版本 | egg 2.x | egg 1.x
--- | --- | ---
1.x | 😁 | ❌

### 依赖的插件

## 使用

```js
// {app_root}/config/plugin.js
exports.handlebars = {
  enable: true,
  package: 'egg-view-handlebars',
};
```

## 配置

> 参考 [https://handlebarsjs.com/zh/api-reference/compilation.html#handlebars-compile-template-options](https://handlebarsjs.com/zh/api-reference/compilation.html#handlebars-compile-template-options)

```js
// {app_root}/config/config.default.js
config.handlebars = {

};

config.view = {
    defaultViewEngine: 'handlebars',
    defaultExtension: '.html',
    mapping: {
      '.html': 'handlebars',
    },
  }
```

## 示例

```js

```
## License

[MIT](LICENSE)