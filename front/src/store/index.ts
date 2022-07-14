import { createStore, Store, useStore } from "vuex";
import localStoragePlugin from "@/plugins/store-data-persist/index";
import { AppStorekey } from "@/shared/setup/keys-injection.setup";
import { AppState } from "@/shared/entities/store.entities";

export function createAppStore(): Store<AppState> {
  return createStore<AppState>({
    plugins: [localStoragePlugin()],
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {},
  });
}

export function useAppStore() {
  return useStore(AppStorekey);
}
