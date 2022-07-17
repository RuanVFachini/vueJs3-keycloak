export const authConfig = {
  clientId: process.env.VUE_APP_CLIENT_ID,
  clientSecret: process.env.VUE_APP_CLIENT_SECRET,
  authUri: process.env.VUE_APP_AUTH_URI,
  responseType: process.env.VUE_APP_AUTH_RESPONSE_TYPE,
  scope: process.env.VUE_APP_AUTH_SCOPE,
  redirectUri: process.env.VUE_APP_AUTH_REDIRECT_URI,
  enabled: (process.env.VUE_APP_AUTH_ENABLED == "true"),
  tokenUri: "/token",
};

export const axiosConfig = {
  headerPrefix: process.env.VUE_APP_AUTH_HEADER_PREFIX + " ",
  apiBaseUri: process.env.VUE_APP_API_BASE_URI,
};

export function getKeycloakRedirecUri(): string {
  return `${authConfig.authUri}/auth?client_id=${authConfig.clientId}\
  &response_type=${authConfig.responseType}\
  &scope=${authConfig.scope}\
  &redirect_uri=${authConfig.redirectUri}`.replace(/\s/g, "");
}
