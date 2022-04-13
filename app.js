/*
 * @Author: 姜彦汐
 * @Date: 2020-11-27 09:36:21
 * @LastEditors: 姜彦汐
 * @LastEditTime: 2022-04-13 20:54:23
 * @Description: 
 * @Site: https://www.undsky.com
 */
const path = require('path');
const handlebars = require('handlebars');
const fs = require('fs');

// https://gist.github.com/akhoury/9118682

handlebars.registerHelper("xif", function (expression, options) {
  return handlebars.helpers["x"].apply(this, [expression, options]) ? options.fn(this) : options.inverse(this);
});

handlebars.registerHelper("x", function (expression, options) {
  var result;

  // you can change the context, or merge it with options.data, options.hash
  var context = Object.assign(options.data.root, this);

  // yup, i use 'with' here to expose the context's properties as block variables
  // you don't need to do {{x 'this.age + 2'}}
  // but you can also do {{x 'age + 2'}}
  // HOWEVER including an UNINITIALIZED var in a expression will return undefined as the result.
  with(context) {
    result = (function () {
      try {
        return eval(expression);
      } catch (e) {
        console.warn('•Expression: {{x \'' + expression + '\'}}\n•JS-Error: ', e, '\n•Context: ', context);
      }
    }).call(context); // to make eval's lexical this=context
  }
  return result;
});

handlebars.registerHelper("link", function (expression, options) {
  return `<link rel="stylesheet" href="${_getUrl(expression, options)}">`
});

handlebars.registerHelper("script", function (expression, options) {
  return `<script src="${_getUrl(expression, options)}"></script>`
});

handlebars.registerHelper("math", function (lvalue, operator, rvalue, options) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);

  return {
    "+": lvalue + rvalue,
    "-": lvalue - rvalue,
    "*": lvalue * rvalue,
    "/": lvalue / rvalue,
    "%": lvalue % rvalue
  } [operator];
});

module.exports = app => {
  const {
    options: compileOptions,
    runtimeOptions,
    partialsPath
  } = app.config.handlebars
  const prod = 'prod' == app.config.env

  let templates = {}
  const viewRoot = app.config.view.root
  const viewsPath = 'string' == typeof viewRoot ? [viewRoot] : viewRoot

  let partials = {}
  let _partialsPath = [];
  if (partialsPath) {
    _partialsPath = 'string' == typeof partialsPath ? [partialsPath] : partialsPath
  } else {
    for (const viewPath of viewsPath) {
      _partialsPath.push(path.join(viewPath, 'partials'))
    }
  }

  if (prod) {
    for (const partialPath of _partialsPath) {
      _loadPartials(partialPath, partials);
    }
    handlebars.registerPartial(partials);

    for (const viewPath of viewsPath) {
      _loadTemplates(viewPath, _partialsPath, templates)
    }
  }

  class HandlebarsView {
    render(name, locals, options) {
      let template;
      if (prod) {
        template = templates[name]
      } else {
        for (const partialPath of _partialsPath) {
          _loadPartials(partialPath, partials);
        }
        handlebars.registerPartial(partials);
        template = fs.readFileSync(name, 'utf8');
      }
      return this.renderString(template, locals, options)
    }

    renderString(tpl, locals, options) {
      return handlebars.compile(tpl, compileOptions)(locals, runtimeOptions)
    }
  }
  app.view.use('handlebars', HandlebarsView);
};

function _loadPartials(partialPath, partials, prefix) {
  const files = fs.readdirSync(partialPath);
  for (let file of files) {
    const filePath = path.join(partialPath, file);
    const basename = path.basename(filePath, path.extname(filePath))
    const name = prefix ? prefix + _upperFirst(basename) : basename
    if (fs.statSync(filePath).isDirectory()) {
      _loadPartials(filePath, partials, name)
    } else if ('.html' == path.extname(filePath)) {
      partials[name] = fs.readFileSync(filePath, 'utf8')
    }
  }
}

function _loadTemplates(viewPath, partialsPath, templates) {
  const files = fs.readdirSync(viewPath);
  for (let file of files) {
    const filePath = path.join(viewPath, file);
    if (fs.statSync(filePath).isDirectory() && partialsPath.indexOf(filePath) == -1) {
      _loadTemplates(filePath, partialsPath, templates)
    } else if ('.html' == path.extname(filePath)) {
      templates[filePath] = fs.readFileSync(filePath, 'utf8')
    }
  }
}

function _upperFirst(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

function _getUrl(url, options) {
  const cdn = options.data.root.cdn;
  const ts = options.hash.ts ? ('false' == options.hash.ts ? false : true) : options.data.root.ctx.app.config.handlebars.ts;
  if ('string' == typeof url) {
    let _url = (url.startsWith('/') || url.startsWith('http')) ? url : (cdn + url)
    if (ts) {
      _url += ((_url.indexOf('?') > -1 ? '&' : '?') + 'ts=' + new Date().getTime())
    }
    return _url
  }
  return url
}