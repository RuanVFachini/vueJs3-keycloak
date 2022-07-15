import axios, { AxiosResponse } from "axios";
import { authConfig } from "./auth.config";
import { KeycloakAuth } from "./auth.entities";

export function createClient() {
  return axios.create({});
}

export type AuthTokenPromisse = Promise<AxiosResponse<KeycloakAuth>>;

export function createAccessTokenRequest(
  access_code: string
): AuthTokenPromisse {
  return baseAccessTokenRequest({
    code: access_code,
    grant_type: "authorization_code",
    scope: authConfig.scope,
  });
}

export function createRefreshTokenRequest(
  refresh_token: string
): AuthTokenPromisse {
  return baseAccessTokenRequest({
    refresh_token: refresh_token,
    grant_type: "refresh_token",
  });
}

export function baseAccessTokenRequest(
  config: Record<string, string>
): AuthTokenPromisse {
  const params = new URLSearchParams(config);
  params.append("client_id", authConfig.clientId);
  params.append("client_secret", authConfig.clientSecret);
  params.append("redirect_uri", authConfig.redirectUri);

  const headers = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const uri = `${authConfig.authUri}${authConfig.tokenUri}`;

  return axios.post(uri, params, headers);
}
