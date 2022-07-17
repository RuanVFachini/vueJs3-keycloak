/* eslint-disable */
import { createApp } from "vue";

import authKeycloakPlugin from "./plugins/auth-keycloak/index";

import App from "./App.vue";
import routes from "./router";
import { createAppStore } from "./store/index"
import { AppStorekey } from "./shared/setup/keys-injection.setup";
import { AuthPluginConfig } from "./plugins/auth-keycloak/auth.types";

createApp(App)
  .use(createAppStore(), AppStorekey)
  .use(authKeycloakPlugin, new AuthPluginConfig(routes, "login"))
  .mount("#app");
