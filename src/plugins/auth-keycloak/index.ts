import { App } from "vue";
import { Store } from "vuex";
import { RouteRecordRaw } from "vue-router";

import authStoreModule from "./auth.store.module"
import authAxiosPlugin from "./auth.axios.plugin"
import authMessages from "@/plugins/auth-keycloak/auth.messages";
import { createAuthRouter } from "./auth.router";

export default {
  install(app: App, routes: Array<RouteRecordRaw>, loginRouteName: string): void {
    
    if (!app.config.globalProperties.$store) {
      throw new Error (authMessages.dependsOnVuex);
    }

    app.use(authAxiosPlugin, loginRouteName);

    const store = app.config.globalProperties.$store as Store<any>;

    if (!store.state.auth) {
      const updatedState = Object.assign({}, store.state, {auth: authStoreModule.state});
      store.replaceState(updatedState);
    }

    store.registerModule("auth", authStoreModule, { preserveState: true });

    const router = createAuthRouter(routes, loginRouteName, store);

    app.use(router);
  },
};
