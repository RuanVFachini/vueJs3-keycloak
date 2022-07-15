export class AccessTokenCodeResponse {
  code: string;
  session_state: string;

  constructor(code: string, session_state: string) {
    this.code = code;
    this.session_state = session_state;
  }
}

export class AccessTokenCodeErrorResponse {
  error: string;
  error_description: string;

  constructor(error: string, error_description: string) {
    this.error = error;
    this.error_description = error_description;
  }
}

export interface KeycloakAuthErro {
  error: string;
  error_description: string;
}

export class AuthUser {
  roles: string[];
  name: string;
  username: string;
  email: string;
}

export class KeycloakAuth {
  login_time: number;
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token: string;
  notBeforePolicy: number;
  session_state: string;
  get user(): AuthUser {
    return extractUser(this.access_token);
  }

  constructor(
    login_time = 0,
    access_token = "",
    expires_in = 0,
    refresh_expires_in = 0,
    refresh_token = "",
    token_type = "",
    id_token = "",
    notBeforePolicy = 0,
    session_state = ""
  ) {
    this.login_time = login_time;
    this.access_token = access_token;
    this.expires_in = expires_in;
    this.refresh_expires_in = refresh_expires_in;
    this.refresh_token = refresh_token;
    this.token_type = token_type;
    this.id_token = id_token;
    this.notBeforePolicy = notBeforePolicy;
    this.session_state = session_state;
  }
}

export interface AuthState {
  token: KeycloakAuth;
  user: null | AuthUser;
  currentUri: string;
}

export interface GlobalState {
  auth: AuthState;
}
function extractUser(access_token: string): AuthUser {
  throw new Error(`Function not implemented. ${access_token}`);
}
