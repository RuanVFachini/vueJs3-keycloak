import { AxiosInstance } from "axios";
import { Router } from "vue-router";
import { Store } from "vuex";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $http: AxiosInstance;
    $store: Store<GlobalState>;
    $router: Router;
  }
}
