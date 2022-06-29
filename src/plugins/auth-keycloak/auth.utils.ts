import { RouteLocationNormalized } from "vue-router";
import { AccessTokenCodeErrorResponse, AccessTokenCodeResponse } from "./auth.entities";

export function hasValues(obj: any | any[]) {
  return obj && Object.values(obj).length ? true : false;
}

export function extractAuthParams(
  to: RouteLocationNormalized
): AccessTokenCodeResponse | AccessTokenCodeErrorResponse | null {
  const query = (to.query as any);
  let params = null;
  
  if (query.code) {
    params = new AccessTokenCodeResponse(query.code, query.session_state);
  } else if (query.error) {
    params = new AccessTokenCodeErrorResponse(query.error, query.error_description);
  }
  
  return params;
}