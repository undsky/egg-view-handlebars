/*
 * @Author: 姜彦汐
 * @Date: 2021-12-30 13:40:46
 * @LastEditors: 姜彦汐
 * @LastEditTime: 2021-12-30 13:47:58
 * @Description: 
 * @Site: https://www.undsky.com
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1640842803710_1577';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.view = {
    defaultViewEngine: 'handlebars',
    defaultExtension: '.html',
    mapping: {
      '.html': 'handlebars',
    },
  }

  return {
    ...config,
    ...userConfig,
  };
};