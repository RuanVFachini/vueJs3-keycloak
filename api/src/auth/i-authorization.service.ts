import { AuthorizationTypeKey } from "./authorization.type";

export interface IAuthorizationService {
    authorize(authorizationList: AuthorizationTypeKey[]): Promise<void>;
}