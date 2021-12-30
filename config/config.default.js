/*
 * @Author: 姜彦汐
 * @Date: 2020-11-27 09:33:06
 * @LastEditors: 姜彦汐
 * @LastEditTime: 2021-12-12 12:08:18
 * @Description: https://handlebarsjs.com/zh/
 * @Site: https://www.undsky.com
 */
module.exports = appInfo => ({
  /**
   * handlebars default config
   * More https://handlebarsjs.com/zh/api-reference/compilation.html#handlebars-compile-template-options
   * @member
   * @property {Boolean} [data=true] 设置为 false 以终止 @data 跟踪。
   * @property {Boolean} [compat=true] 设置为 true 以允许递归领域查找。
   * @property {Boolean} [knownHelpers=false] 将已知在模版运行时会真实存在的助手代码列表 Hash 化。输入本参数会使编译器在一些情况下优化。内置助手代码 已经在本列表里包含，但若设置本项为 false，内置的助手代码可能会被忽视。
   * @property {Boolean} [knownHelpersOnly=true] 设置为 true 以允许基于已知助手代码列表的进一步优化。
   * @property {Boolean} [noEscape=false] 设置为 true 以避免 HTML 的内容转义。
   * @property {Boolean} [strict=false] 在严格模式下运行。在这个模式下，模版将会对缺失参数抛出异常，而非静默忽略。同时，这种模式将会禁止逆操作，比如 {{^foo}}{{/foo}}，除非领域被特意包含在源对象中。
   * @property {Boolean} [assumeObjects=false] 在遍历路径时，不再检查对象是否存在。这是严格模式的子集，本子集在已知输入安全的情况下会生成最优模版。
   * @property {Boolean} [preventIndent=true] 默认情况下，缩进的代码片段调用将会导致代码片段整体全部被缩进。在代码片段写入 pre 标签时，这会造成未 预料到的结果。将本项设置成 true 可以避免这种自动缩进的功能。
   * @property {Boolean} [ignoreStandalone=true] 当设置为 true 时，将不会去除单独的标签。在这种情况下，不在同一行的代码块和代码片段将不会去除本行 里的空格。
   * @property {Boolean} [explicitPartialContext=true] 对代码片段的上下文进行精确设置。当开启时，没有设置上下文的代码片段将会依托空对象执行。
   */
  handlebars: {
    options: {
      data: true,
      compat: true,
      knownHelpers: true,
      knownHelpersOnly: false,
      noEscape: false,
      strict: false,
      assumeObjects: false,
      preventIndent: true,
      ignoreStandalone: true,
      explicitPartialContext: true
    },
    runtimeOptions: { // https://handlebarsjs.com/zh/api-reference/runtime-options.html
      allowProtoMethodsByDefault: true,
      allowProtoPropertiesByDefault: true
    },
    partialsPath: null, // 默认在 view.root 对应的 partials 目录下
    ts: true, // CSS、JavaScript 外部资源引用是否添加时间戳
  },
});