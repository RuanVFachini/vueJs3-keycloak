import { createStore, Store } from "vuex";
import { StoreTestType } from "./entities.fake";
import authStore from "@/plugins/auth-keycloak/store/index";

export function getStore(state = new StoreTestType()): Store<StoreTestType> {
  const store = createStore<StoreTestType>({
    state: state,
    modules: {},
  });
  store.registerModule("auth", authStore, { preserveState: true });
  return store;
}
