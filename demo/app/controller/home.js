/*
 * @Author: 姜彦汐
 * @Date: 2021-12-30 13:40:46
 * @LastEditors: 姜彦汐
 * @LastEditTime: 2021-12-30 13:45:46
 * @Description: 
 * @Site: https://www.undsky.com
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const {
      ctx
    } = this;

    ctx.body = await ctx.renderView('index')
  }
}

module.exports = HomeController;