import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Router } from "vue-router";
import { Store } from "vuex";

import { axiosConfig } from "./auth.config";
import { GlobalState } from "./auth.entities";

export function onSendRequestMiddleware(store: Store<GlobalState>): ((value: AxiosRequestConfig<any>) => void | Promise<void>) | undefined {
  return request => {
    const headers = request.headers ?? {};
    headers["Authorization"] = axiosConfig.headerPrefix + store.state.auth.token.access_token;
    request.headers = headers;
  };
}

export function onFailureMiddleware(store: Store<GlobalState>, router: Router, loginRouteName: string): ((error: any) => any) | undefined {

  return (failure: AxiosResponse) => {
    if (failure.status == 401 && store.getters.refreshTokenIsValid) {
      store.dispatch("refreshTokenAsync");
      if (store.getters.tokenIsValid) {
        failure.request
      }
    } else {
      router.push(loginRouteName);
    }
  };
}