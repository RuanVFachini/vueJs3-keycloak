import axios from "axios";
import { Request, Response } from "express";
import { KeycloakUserInfoDto } from "../dtos/keycloak-user-info.dto";
import https from 'https';
import fs from "fs";

export default async (req: Request, res: Response, next: () => any): Promise<void> => {
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false, // (NOTE: this will disable client verification)
        cert: fs.readFileSync("../../../../cert/usercert.pem"),
        key: fs.readFileSync("../../../../key.pem"),
        passphrase: "YYY"
    });

    const instance = axios.create({ httpsAgent });

    if(req.headers.authorization) {
        const keycloakHost = "localhost";
        const keycloakPort = "80";
        const realmName = "master";
        debugger
        await instance.get<KeycloakUserInfoDto>(`https://${keycloakHost}:${keycloakPort}/auth/realms/${realmName}/protocol/openid-connect/userinfo`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: req.headers.authorization,
            },
        }).then(resp => {
            debugger
            let a = 1;
        }).catch(resp => {
            debugger
            setUnauthorizedStatus(res);
            next();
        });
        
    } else {
        setUnauthorizedStatus(res);
        next();
    };

}

function setUnauthorizedStatus(res: Response) {
    res.status(401).json({
        error: `unauthorized`,
    });
}

