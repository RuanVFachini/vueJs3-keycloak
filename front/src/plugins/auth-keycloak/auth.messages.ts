export default {
  dependsOnVuex: "This plugin depends on: [Vuex]",
  invalidLoginRouteName: (
    loginRouteName: string,
    routes: (string | undefined)[]
  ) => `Invalid login route name: "${loginRouteName}". Avaibles: [${routes}]`,
};
