import { Module } from "vuex";
import { AuthState, AuthUser, KeycloakAuth } from "@/plugins/auth-keycloak/auth.entities";
import { mutations } from "./mutations";
import { getters } from "./getters";
import { actions } from "./actions";

export default {
  state: {
    token: new KeycloakAuth(),
    user: null,
    currentUri: "",
  },
  getters: { ...getters },
  mutations: { ...mutations },
  actions: { ...actions },
  modules: {},
} as Module<AuthState, unknown>;
