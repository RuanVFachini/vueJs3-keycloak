import { IdentityUserInfoDto } from "./identity.dtos";

export interface IIdentityUserInfoService {
    getUserinfoIdentityByToken(authorization: string | undefined): Promise<IdentityUserInfoDto>;
}