import axios from "axios";
import { App } from "vue";
import { Router } from "vue-router";
import { Store } from "vuex";

import {
  onRequestSuccessMiddleware,
  onRequestErrorMiddleware,
  onResponseSuccessMiddleware,
  onResponseErrorMiddleware
} from "./auth.axios.middlewares";
import { GlobalState } from "./auth.entities";

export default {
  install(app: App, loginRouteName: string): void {
    const axiosInstance = axios.create();
    const store = app.config.globalProperties.$store as Store<GlobalState>;
    const router = app.config.globalProperties.$router as Router;

    axiosInstance.interceptors.request.use(
      onRequestSuccessMiddleware(store),
      onRequestErrorMiddleware);

    axiosInstance.interceptors.response.use(
      onResponseSuccessMiddleware,
      onResponseErrorMiddleware(store, router, loginRouteName)
    );

    app.config.globalProperties.$http = axiosInstance;
  },
};
