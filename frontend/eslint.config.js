import pluginVue from 'eslint-plugin-vue';
export default [
  // add more generic rulesets here, such as:
  // js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  // ...pluginVue.configs['flat/vue2-recommended'], // Use this if you are using Vue.js 2.x.
  {
    extends: [
      // add more generic rulesets here, such as:
      // 'eslint:recommended',
      'plugin:vue/vue3-recommended',
      // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
    ],
    rules: {
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
    },
  },
  eslintConfigPrettier,
];
