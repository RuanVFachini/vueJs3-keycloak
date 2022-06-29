import { App } from "vue";
import { Router } from "vue-router";
import { Store } from "vuex";

import { createClient } from "./auth.axios.intance";
import { onSendRequestMiddleware, onFailureMiddleware } from "./auth.axios.middlewares";
import { axiosConfig } from "./auth.config";
import { GlobalState } from "./auth.entities";

export default  {
  install(app: App, loginRouteName: string): void {
    const axiosInstance = createClient(axiosConfig.apiBaseUri);
    app.config.globalProperties.$http = axiosInstance;

    const store = app.config.globalProperties.$store as Store<GlobalState>;
    const router = app.config.globalProperties.$router as Router;

    axiosInstance.interceptors.request.use(onSendRequestMiddleware(store));

    axiosInstance.interceptors.response.use(
      undefined,
      onFailureMiddleware(store, router, loginRouteName)
    );
  },
};