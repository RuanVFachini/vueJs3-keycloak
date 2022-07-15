import { AxiosRequestConfig } from "axios";
import { Router } from "vue-router";
import { Store } from "vuex";

import { axiosConfig } from "./auth.config";
import { GlobalState } from "./auth.entities";
import { REFRESH_TOKEN_ASYNC } from "./store/keys";

export function onSendRequestMiddleware(
  store: Store<GlobalState>
): ((value: AxiosRequestConfig<any>) => void | Promise<void>) | undefined {
  return (request) => {
    const headers = request.headers ?? {};
    headers["Authorization"] =
      axiosConfig.headerPrefix + store.state.auth.token.access_token;
    request.headers = headers;
  };
}

export function onFailureMiddleware(
  store: Store<GlobalState>,
  router: Router,
  loginRouteName: string
): ((error: any) => any) | undefined {
  return (error: any) => {
    debugger
    if (isNetworkError(error)) {
      const errorMessage = `Network Error: ${error}`;
      return Promise.reject(new Error(errorMessage));
    }

    if (error.status == 401) {
      if (store.getters.refreshTokenIsValid) {
        store.dispatch(REFRESH_TOKEN_ASYNC);
        if (store.getters.tokenIsValid) {
          // error.request;
          console.log("fazer request ser executada depis do refresh");
        }
      } else {
        router.push(loginRouteName);
      }
    }
  };
}

function isNetworkError ( err ) {
  return !!err}
