import { AxiosRequestConfig } from "axios";
import { Router } from "vue-router";
import { Store } from "vuex";

import { authConfig, axiosConfig } from "./auth.config";
import { GlobalState } from "./auth.entities";
import { IS_AUTHENTICATED, REFRESH_TOKEN_ASYNC, TOKEN_IS_VALID,  } from "./store/keys";

export function onRequestSuccessMiddleware(
  store: Store<GlobalState>,
  router: Router,
  loginRouteName: string
): (request: AxiosRequestConfig<any>) => Promise<AxiosRequestConfig<any>> {
  return async (request: AxiosRequestConfig<any>) => {
    if(store.getters[IS_AUTHENTICATED]) {
      if (!store.getters[TOKEN_IS_VALID]) {
        await store.dispatch(REFRESH_TOKEN_ASYNC);
        if (!store.getters[TOKEN_IS_VALID]) {
          router.push(loginRouteName);    
        }
      }
      
      const authorization = axiosConfig.headerPrefix + store.state.auth.token.access_token;
      request.headers.common["Authorization"] = authorization;

      return request;
    } else {
      router.push(loginRouteName);
    }
  };
}

export function onRequestErrorMiddleware(error: any) {
  return Promise.reject(error);
};

export function onResponseSuccessMiddleware(
  response: AxiosRequestConfig<any>) : AxiosRequestConfig<any> {
  return response;
};

export function onResponseErrorMiddleware(
  store: Store<GlobalState>,
  router: Router,
  loginRouteName: string
): (error: any) => any | undefined {
  return (error: any) => {
    if (authConfig.redirectLogin && error.status == 401) {
      router.push(loginRouteName);
    } else if (error) {
      return Promise.reject(error);
    }
  };
}
