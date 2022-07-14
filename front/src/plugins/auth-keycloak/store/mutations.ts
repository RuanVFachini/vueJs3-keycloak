import { MutationTree } from "vuex";
import { AuthState, KeycloakAuth } from "../auth.entities";
import { extractUser } from "../auth.utils";
import { SET_AUTH, SET_LAST_URI } from "./keys";

export const mutations: MutationTree<AuthState> = {
  [SET_AUTH](state, payload: KeycloakAuth) {
    state.token = payload;
    state.user = extractUser(payload.access_token);
  },
  [SET_LAST_URI](state, payload: string) {
    state.currentUri = payload;
  }
}
