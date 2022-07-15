import {
  NavigationGuardNext,
  RouteLocationNormalized,
  Router,
} from "vue-router";
import { Store } from "vuex";
import { AccessTokenCodeResponse, AuthState } from "./auth.entities";
import authMessages from "./auth.messages";
import { extractAuthParams, hasValues } from "./auth.utils";
import {
  SET_LAST_URI,
  REFRESH_TOKEN_ASYNC,
  GET_ACCESS_TOKEN_ASYNC,
} from "./store/keys";

export function configureAuthRouter(
  router: Router,
  loginRouteName: string,
  store: Store<AuthState>
) {
  const index = router.getRoutes().findIndex((x) => x.name == loginRouteName);

  if (index < 0) {
    throw new Error(
      authMessages.invalidLoginRouteName(
        loginRouteName,
        router.getRoutes().map((x) => x.name?.toString())
      )
    );
  }

  router.getRoutes()[index].beforeEnter = beforeLoginEnter(store);

  router.beforeEach(beforeEach(loginRouteName, store));

  return router;
}

function beforeEach(loginRouteName: string, store: Store<AuthState>) {
  return async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
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
