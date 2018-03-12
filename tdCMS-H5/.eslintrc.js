// http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // 关闭要求箭头函数的参数使用圆括号
    'arrow-parens': 0,
    // TAB缩进
    "indent": ["error", 'tab'],
    'no-tabs':0,
    //space & tab 不能混编
    'no-mixed-spaces-and-tabs':"error",
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 关闭文件末尾保留一行空行
    'eol-last': 0,
    // 要求或禁止函数圆括号之前有一个空格
    'space-before-function-paren': 0
  }
}
