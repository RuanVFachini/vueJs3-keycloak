import axios from "axios";
import authConfig from "./auth.config";
import { IIdentityUserInfoService } from "./i-identity.service";
import { IdentityUserInfoDto } from "./identity.dtos";

export class IdentityUserInfoService implements IIdentityUserInfoService {
    
    getUserinfoIdentityByToken(authorization: string | undefined): Promise<IdentityUserInfoDto> {
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
            throw resp;
        });
    }

}