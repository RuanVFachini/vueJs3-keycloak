import { Module } from "vuex";
import { AuthState, KeycloakAuth } from "@/plugins/auth-keycloak/auth.entities";
import { mutations } from "./mutations";
import { getters } from "./getters";
import { actions } from "./actions";

export default {
  state: {
    token: new KeycloakAuth(),
    user: null,
    currentUri: "",
    isRefreshToken: false,
  },
  getters: { ...getters },
  mutations: { ...mutations },
  actions: { ...actions },
  modules: {},
} as Module<AuthState, unknown>;
