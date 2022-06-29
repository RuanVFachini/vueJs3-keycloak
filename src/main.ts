/* eslint-disable */
import { createApp } from "vue";

import authKeycloakPlugin from "./plugins/auth-keycloak/index";

import App from "./App.vue";
import routes from "./router";
import { createAppStore } from "./store/index"
import { AppStorekey } from "./shared/setup/keys-injection.setup";

createApp(App)
  .use(createAppStore(), AppStorekey)
  .use(authKeycloakPlugin, routes, "login")
  .mount("#app");
