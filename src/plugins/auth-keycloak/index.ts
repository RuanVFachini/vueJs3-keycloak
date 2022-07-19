import { App } from "vue";
import { Store } from "vuex";
import { createRouter, createWebHistory } from "vue-router";

import authStoreModule from "./store/index";
import authAxiosPlugin from "./auth.axios.plugin";
import authMessages from "@/plugins/auth-keycloak/auth.messages";
import { configureAuthRouter } from "./auth.router";
import { AuthPluginConfig } from "./auth.types";

export default {
  install(
    app: App,
    config: AuthPluginConfig = new AuthPluginConfig([], "login"),
  ): void {
    if (!app.config.globalProperties.$store) {
      throw new Error(authMessages.dependsOnVuex);
    }

    const routes = config.routes;

    const router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes,
    });

    app.config.globalProperties.$router = router;

    app.use(authAxiosPlugin, config);

    const store = app.config.globalProperties.$store as Store<any>;

    if (!store.state.auth) {
      const updatedState = Object.assign({}, store.state, {
        auth: authStoreModule.state,
      });
      store.replaceState(updatedState);
    }

    store.registerModule("auth", authStoreModule, { preserveState: true });

    configureAuthRouter(router, config.loginRouteName, store);

    app.use(router);
  },
};
