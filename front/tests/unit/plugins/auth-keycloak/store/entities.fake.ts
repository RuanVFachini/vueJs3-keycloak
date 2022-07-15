import { AuthState, KeycloakAuth } from "@/plugins/auth-keycloak/auth.entities";
import { extractUser } from "@/plugins/auth-keycloak/auth.utils";

export class StoreTestType {
  auth: AuthState;

  constructor(token = new KeycloakAuth(), lastUri = "") {
    this.auth = {
      token: token,
      user: extractUser(token.access_token),
      currentUri: lastUri,
    };
  }
}
