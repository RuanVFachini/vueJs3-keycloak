import { GetterTree } from "vuex";
import { AuthState } from "../auth.entities";
import { TOKEN_IS_VALID, REFRESH_TOKEN_IS_VALID, IS_REFRESH_TOKEN } from "./keys";

export function isExpired(time: number, offsetInSeconds = 0): boolean {
  if (time) {
    return time + offsetInSeconds * 1000 < +new Date();
  }
  return true;
}

export const getters: GetterTree<AuthState, unknown> = {
  [IS_REFRESH_TOKEN](state) {
    return (
      state.isRefreshToken
    );
  },
  [TOKEN_IS_VALID](state) {
    return (
      state.token && !isExpired(state.token.login_time, state.token.expires_in)
    );
  },
  [REFRESH_TOKEN_IS_VALID](state) {
    return (
      state.token &&
      !isExpired(state.token.login_time, state.token.refresh_expires_in)
    );
  },
};
