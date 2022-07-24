export interface IdentityUserInfoDto {
    sub: string;
    preferred_username: string;
    organization: string;
}

export interface KeycloakJwtTokenDto {
    "exp": number,
    "iat": number,
    "auth_time": number,
    "jti": "4949f422-f621-4886-9df3-feb0dd0e7f97",
    "iss": "http://localhost/auth/realms/master",
    // "aud": [
    //     "ruan.fachini@keycloak.com",
    //     "master-realm",
    //     "account"
    // ],
    "sub": string,
    "typ": string,
    // "azp": "web-app-front",
    // "session_state": string,
    // "acr": "1",
    // "allowed-origins": [
    //     "http://127.0.0.1:8085"
    // ],
    // "realm_access": {
    //     "roles": [
    //     "create-realm",
    //     "offline_access",
    //     "admin",
    //     "uma_authorization"
    //     ]
    // },
    // "resource_access": {
    //     "master-realm": {
    //     "roles": [
    //         "view-realm",
    //         "view-identity-providers",
    //         "manage-identity-providers",
    //         "impersonation",
    //         "create-client",
    //         "manage-users",
    //         "query-realms",
    //         "view-authorization",
    //         "query-clients",
    //         "query-users",
    //         "manage-events",
    //         "manage-realm",
    //         "view-events",
    //         "view-users",
    //         "view-clients",
    //         "manage-authorization",
    //         "manage-clients",
    //         "query-groups"
    //     ]
    //     },
    //     "account": {
    //     "roles": [
    //         "manage-account",
    //         "manage-account-links",
    //         "view-profile"
    //     ]
    //     }
    // },
    "scope": "email profile",
    // "email_verified": boolean,
    "preferred_username": "admin"
}