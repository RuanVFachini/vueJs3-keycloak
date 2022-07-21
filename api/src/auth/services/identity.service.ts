import axios from "axios";
import { IdentityUserInfoDto } from "../dtos/identity.dtos";
import { IIdentityUserInfoService } from "../interfaces/i-identity.service";
import authConfig from "../configs/auth.config";

export class IdentityUserInfoService implements IIdentityUserInfoService {
    
    getUserinfoIdentityByToken(authorization: string | undefined): Promise<IdentityUserInfoDto | undefined> {
        const server = authConfig.keycloakHost;
        const port = authConfig.keycloakPort;
        const realm = authConfig.keycloakRealmName;

        const url = `http://${server}:${port}/auth/realms/${realm}/protocol/openid-connect/userinfo`;
        return axios.get<IdentityUserInfoDto>(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authorization ?? "",
            },
        }).then(resp => {
            return resp.data;
        }).catch(resp => {
            return undefined
        });
    }

}