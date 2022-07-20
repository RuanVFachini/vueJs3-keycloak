import { AxiosInstance } from "axios";
import { Router } from "vue-router";
import { Store } from "vuex";
import { GlobalState } from "@/plugins/auth-keycloak/auth.entities";
import { Loading } from "@/shared/entities/loading.entities"

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $http: AxiosInstance;
    $store: Store<GlobalState>;
    $router: Router;
    $loading: Loading;
  }
}
