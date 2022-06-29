import { AuthState, KeycloakAuth } from "@/plugins/auth-keycloak/auth.entities";
import authStore from "@/plugins/auth-keycloak/auth.store.module";
import { createStore, Store } from "vuex";


class storeTestType {
  auth: AuthState;

  constructor(token = new KeycloakAuth()) {
    this.auth = {
      token: token,
      currentUri: ""
    };
  }
};

function getStore(state = new storeTestType()): Store<storeTestType> {
  const store = createStore<storeTestType>({
    state: state,
    modules: {  }
  });

  store.registerModule("auth", authStore, { preserveState: true });

  return store;
}

function getKeycloakAuthState() {
  return new KeycloakAuth(
    1,"1",1,1,"1","1","1",1,"1"
  );
}

describe("mutations", () => {
  it("setAuth", () => {
    const store = getStore();

    console.log(store.state);
    console.log(new storeTestType());
    expect(store.state).toBe(new storeTestType());

    const token = getKeycloakAuthState();
    store.commit("setAuth", token);

    expect(store.state.auth.token).toBe(token);
  })
});