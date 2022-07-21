import { IdentityUserInfoDto } from "../dtos/identity.dtos";

export interface IIdentityUserInfoService {
    getUserinfoIdentityByToken(authorization: string | undefined): Promise<IdentityUserInfoDto | undefined>;
}