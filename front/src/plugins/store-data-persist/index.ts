import { Store } from "vuex";

export default function createDataPersistence<T>() {
  return (store: Store<T>) => {
    const appState = localStorage.getItem("app");
    if (appState != null) {
      const newState = JSON.parse(appState) as T;
      store.replaceState(newState);
    }

    store.subscribe((mutation, state) => {
      localStorage.setItem("app", JSON.stringify(state));
    });
  };
}
