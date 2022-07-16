import { AxiosRequestConfig } from "axios";
import { Router } from "vue-router";
import { Store } from "vuex";

import { axiosConfig } from "./auth.config";
import { GlobalState } from "./auth.entities";
import { REFRESH_TOKEN_ASYNC } from "./store/keys";

export function onRequestSuccessMiddleware(
  store: Store<GlobalState>
): (value: AxiosRequestConfig<any>) => AxiosRequestConfig<any> {
  return (request: AxiosRequestConfig<any>) => {
    const authorization = (axiosConfig.headerPrefix + store.state.auth.token.access_token);
    request.headers.common["Authorization"] = authorization;
    return request
  };
}

export function onRequestErrorMiddleware(error: any) {
  return Promise.reject(error)
};

export function onResponseSuccessMiddleware(response: AxiosRequestConfig<any>) : AxiosRequestConfig<any> {
  return response;
};

export function onResponseErrorMiddleware(
  store: Store<GlobalState>,
  router: Router,
  loginRouteName: string
): (error: any) => any | undefined {
  return (error: any) => {
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
    } else if (error) {
      return Promise.reject(error);
    }
  };
}
