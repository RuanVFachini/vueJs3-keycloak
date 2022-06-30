import { AuthState, KeycloakAuth } from "@/plugins/auth-keycloak/auth.entities";

export class StoreTestType {
  auth: AuthState;

  constructor(token = new KeycloakAuth(), lastUri = "") {
    this.auth = {
      token: token,
      currentUri: lastUri
    };
  }
};