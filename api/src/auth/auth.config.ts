class AuthConfig {
    public get keycloakHost() { return process.env.KEYCLOAK_HOST};
    public get keycloakPort() {return process.env.KEYCLOAK_PORT};
    public get keycloakRealmName() {return process.env.KEYCLOAK_REALM_NAME};
}

export default new AuthConfig();