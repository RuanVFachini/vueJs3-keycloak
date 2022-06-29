import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { AxiosResponse } from "axios";
import { AccessTokenCodeResponse, AuthState, KeycloakAuth } from "@/plugins/auth-keycloak/auth.entities";
import { AuthTokenPromisse, createAccessTokenRequest, createRefreshTokenRequest } from "./auth.axios.intance";

function isExpired(time: number, offsetInSeconds = 0): boolean {
  if (time) {
    return time + (offsetInSeconds * 1000) < (+new Date());
  }
  return true;
}

const actions: ActionTree<AuthState, unknown> = {
  getAccessTokenAsync({ dispatch }, payload: AccessTokenCodeResponse) {
    return dispatch("updateTokenAsync", createAccessTokenRequest(payload.code));
  },
  refreshTokenAsync({ state, dispatch }) {
    return dispatch("updateTokenAsync", createRefreshTokenRequest(state.token.refresh_token));
  },
  updateTokenAsync({ commit }, payload: AuthTokenPromisse) {
    return payload.then(
      (success: AxiosResponse<KeycloakAuth, any>) => {
        const auth = Object.assign({}, success.data, { login_time: +new Date() });
        commit("setAuth", auth);
      },
      (failure) => {
        console.log(`Details: ${failure}`);
      }
    );  
  }
};

const getters: GetterTree<AuthState, unknown> = {
  tokenIsValid(state) {
    return (
      state.token && !isExpired(state.token.login_time, state.token.expires_in)
    );
  },
  refreshTokenIsValid(state) {
    return (
      state.token &&
      !isExpired(state.token.login_time, state.token.refresh_expires_in)
    );
  },
};

const mutations: MutationTree<AuthState> = {
  setAuth(state, payload: KeycloakAuth) {
    state.token = payload;
  },
  setLastUri(state, payload: string) {
    state.currentUri = payload;
  }
}

export default {
  state: {
    token: new KeycloakAuth(),
    currentUri: "",
  },
  getters: { ...getters},
  mutations: { ...mutations },
  actions: { ...actions },
  modules: {},
} as Module<AuthState, unknown>;
