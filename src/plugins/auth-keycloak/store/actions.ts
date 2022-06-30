import { AxiosResponse } from "axios";
import { ActionTree } from "vuex";
import { AuthTokenPromisse, createAccessTokenRequest, createRefreshTokenRequest } from "../auth.axios.intance";
import { AccessTokenCodeResponse, AuthState, KeycloakAuth } from "../auth.entities";
import { GET_ACCESS_TOKEN_ASYNC, UPDATE_TOKEN_ASYNC, REFRESH_TOKEN_ASYNC, SET_AUTH } from "./keys";

export const actions: ActionTree<AuthState, unknown> = {
  [GET_ACCESS_TOKEN_ASYNC]({ dispatch }, payload: AccessTokenCodeResponse) {
    return dispatch(UPDATE_TOKEN_ASYNC, createAccessTokenRequest(payload.code));
  },
  [REFRESH_TOKEN_ASYNC]({ state, dispatch }) {
    return dispatch(UPDATE_TOKEN_ASYNC, createRefreshTokenRequest(state.token.refresh_token));
  },
  [UPDATE_TOKEN_ASYNC]({ commit }, payload: AuthTokenPromisse) {
    return payload.then(
      (success: AxiosResponse<KeycloakAuth, any>) => {
        const auth = Object.assign({}, success.data, { login_time: +new Date() });
        commit(SET_AUTH, auth);
      },
      (failure) => {
        console.log(`Details: ${failure}`);
      }
    );  
  }
};