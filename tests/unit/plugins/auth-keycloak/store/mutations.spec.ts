import { StoreTestType } from "./entities.fake";
import { getStore } from "./mock.tools";
import { cloneDeep } from "lodash";
import { KeycloakAuth } from "@/plugins/auth-keycloak/auth.entities";
import { SET_AUTH } from "@/plugins/auth-keycloak/store/keys";

const emptyToken = new KeycloakAuth(); 
const someToken = new KeycloakAuth(1,"1",1,1,"1","1","1",1,"1");

describe("auth-plugin: store", () => {
  describe(SET_AUTH, () => {
    test.each([
      { oldValue: emptyToken, newValue: someToken, expected: someToken },
      { oldValue: someToken, newValue: emptyToken, expected: emptyToken },
    ])(`oldAccessToken => $oldValue.access_token, newAceesToken => $newValue.access_token, currentAccessToken => $expected.access_token`, ({ oldValue, newValue, expected }) => {
    
      //arrange
      const store = getStore(new StoreTestType(oldValue));
      // const expected = store.state;
      // const token = ;
      const initialState = cloneDeep(store.state);
    
      //act
      store.commit(SET_AUTH, newValue);
    
      //assert
      expect(initialState).toEqual(new StoreTestType(oldValue));
      expect(store.state.auth.token).toEqual(expected);
    });
  });
});
