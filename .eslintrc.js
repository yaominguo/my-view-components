module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/no-multiple-template-root': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 生产环境禁止debugger
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0, // 生产环境禁止console
    'no-alert': process.env.NODE_ENV === 'production' ? 2 : 0, // 生产环境禁止alert
    'no-shadow-restricted-names': 2, // 禁用关键字及保留字等
    'dot-notation': 1, // 尽可能使用 . 来访问对象属性
    'no-multi-spaces': 1, // 禁止使用多个空格
    'brace-style': 1, // 大括号风格 - one true brace style
    'no-var': 1, // 禁用var声明
    'no-new-object': 1, // 禁止new Object
    'no-array-constructor': 1, // 禁止new Array
    'prefer-const': 1, // 要求使用 const 声明那些声明后不再被修改的变量
    'prefer-destructuring': 1, // 优先使用数组和对象解构
    'no-param-reassign': 1, // 禁止在函数中对函数参数重新赋值
    'no-extra-semi': 1, // 禁用不必要的分号
    // "no-unused-vars": 1, // 禁止已声明但未使用的变量
    // "indent": [1, 2], // 使用2个空格缩进
    'no-multiple-empty-lines': [1, { max: 1 }], // 禁止连续出现2个及以上空行
    'default-case': 1, // 要求switch语句必须有default分支
    'key-spacing': [1, { beforeColon: false, afterColon: true }], // 冒号前不要空格，后需要空格
    'comma-spacing': [1, { before: false, after: true }], // 逗号前不要空格，后需要空格
    'arrow-spacing': [1, { before: true, after: true }], // 箭头函数中的箭头前后需要留空格
    quotes: [1, 'single'], // 字符串使用单引号
    semi: [1, 'never'], // 禁止使用分号
  },
}
