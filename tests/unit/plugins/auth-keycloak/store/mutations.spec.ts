import { StoreTestType } from "./entities.fake";
import { getStore } from "./mock.tools";
import { cloneDeep } from "lodash";
import { KeycloakAuth } from "@/plugins/auth-keycloak/auth.entities";
import { SET_AUTH, SET_LAST_URI } from "@/plugins/auth-keycloak/store/keys";

const emptyToken = new KeycloakAuth(); 
const someToken = new KeycloakAuth(1,"1",1,1,"1","1","1",1,"1");

describe("auth-plugin: store", () => {
  describe(SET_AUTH, () => {
    test.each([
      { oldValue: emptyToken, newValue: someToken },
      { oldValue: someToken, newValue: emptyToken },
    ])(`oldAccessToken => \"$oldValue.access_token\", newAceesToken => \"$newValue.access_token\"`,
    ({ oldValue, newValue }) => {
    
      //arrange
      const store = getStore(new StoreTestType(oldValue));
      const initialState = cloneDeep(store.state);
    
      //act
      store.commit(SET_AUTH, newValue);
    
      //assert
      expect(initialState).toEqual(new StoreTestType(oldValue));
      expect(store.state.auth.token).toEqual(newValue);
    });
  });
  describe(SET_LAST_URI, () => {
    test.each([
      { oldValue: "/", newValue: "/login" },
      { oldValue: "/login", newValue: "/home" },
    ])(`oldLastUri => \"$oldValue\", newLastUri => \"$newValue\"`,
    ({ oldValue, newValue }) => {
    
      //arrange
      const store = getStore(new StoreTestType(null, oldValue));
      const initialState = cloneDeep(store.state);
    
      //act
      store.commit(SET_LAST_URI, newValue);
    
      //assert
      expect(initialState).toEqual(new StoreTestType(null, oldValue));
      expect(store.state.auth.currentUri).toEqual(newValue);
    });
  });
});
