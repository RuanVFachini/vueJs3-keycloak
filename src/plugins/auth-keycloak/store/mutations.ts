import { MutationTree } from "vuex";
import { AuthState, KeycloakAuth } from "../auth.entities";
import { SET_AUTH, SET_LAST_URI } from "./keys";

export const mutations: MutationTree<AuthState> = {
  [SET_AUTH](state, payload: KeycloakAuth) {
    state.token = payload;
  },
  [SET_LAST_URI](state, payload: string) {
    state.currentUri = payload;
  }
}
