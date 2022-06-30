import { AuthState, KeycloakAuth } from "@/plugins/auth-keycloak/auth.entities";

export class StoreTestType {
  auth: AuthState;

  constructor(token = new KeycloakAuth()) {
    this.auth = {
      token: token,
      currentUri: ""
    };
  }
};