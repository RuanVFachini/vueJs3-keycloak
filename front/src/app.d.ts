import { AxiosInstance } from "axios";
import { Router } from "vue-router";
import { Store, Module } from "vuex";
import { AppState } from "@/shared/entities/store.entities";
import { AuthState } from "@/plugins/auth-keycloak/auth.entities";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $http: AxiosInstance;
    $store: Store<GlobalState>;
    $router: Router;
  }
}
