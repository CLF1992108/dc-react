/* eslint-disable quotes */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ["prettier"],
  extends: ["plugin:prettier/recommended", "plugin:react/recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "global-require": 0,
    //强制使用单引号
    quotes: ["error", "single"],
    indent: 0,
    "no-new": 0,
    camelcase: 0,
    "padded-blocks": 0,
    "no-unused-vars": 0,
    "no-trailing-spaces": 0,
    "no-mixed-spaces-and-tabs": 0,
    "space-before-function-paren": [0, "always"],
    "no-multiple-empty-lines": 0,
    "react/prop-types": 0,
  },
  globals: {
    React: false,
    Fetch: false,
    Hub: false,
    echarts: false,
    axios: false,
    Cesium: false,
    DC: false,
    "%=": false,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    parser: "babel-eslint",
  },
};
