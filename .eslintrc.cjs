/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2020: true
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/eslint-config-prettier/skip-formatting"],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "no-unused-vars": "off"
  }
};
