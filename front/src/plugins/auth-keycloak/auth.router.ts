import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from "vue-router";
import { Store } from "vuex";
import { AccessTokenCodeResponse, AuthState } from "./auth.entities";
import authMessages from "./auth.messages";
import { extractAuthParams, hasValues } from "./auth.utils";
import { SET_LAST_URI, REFRESH_TOKEN_ASYNC, GET_ACCESS_TOKEN_ASYNC } from "./store/keys";

export function createAuthRouter(routes: RouteRecordRaw[], loginRouteName: string, store: Store<AuthState>) {
  const index = routes.findIndex(x => x.name == loginRouteName);

  if (index < 0) {
    throw new Error(authMessages.invalidLoginRouteName(loginRouteName, routes.map(x => x.name?.toString())));
  }

  routes[index].beforeEnter = beforeLoginEnter(store);

  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });

  router.beforeEach(beforeEach(loginRouteName, store));

  return router;
}

function beforeEach(loginRouteName: string, store: Store<AuthState>) {
  return async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    if (to.name !== loginRouteName) {
      store.commit(SET_LAST_URI, to.path);
      if (!store.getters.tokenIsValid) {
        if (store.getters.refreshTokenIsValid) {
          await store.dispatch(REFRESH_TOKEN_ASYNC);
        } else {
          return next({ name: loginRouteName });
        }
      }
    }
    next();
  };
}

function beforeLoginEnter(store: Store<AuthState>) {
  return async (to: RouteLocationNormalized) => {
    const params = extractAuthParams(to);

    if (hasValues(params)) {
      if (params instanceof AccessTokenCodeResponse) {
        await store.dispatch(GET_ACCESS_TOKEN_ASYNC, params);
      }
    }
    return true;
  };
}