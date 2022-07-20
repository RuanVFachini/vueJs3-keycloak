import { Request, Response } from "express";
import jose from "jose";

export default async (req: Request, res: Response, next: () => any): Promise<void> => {
    const keycloakPublicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmI6GIKIowV/+5kPe1gEXO21ETXzdFR4VfZ8SbLJlQNpZ7mrMqryG6JXLHhpLBRjJ9F9C2zZvcD+nvpaKnK57jIZ4R4T5lz5gj/iLXRzvDm01NJPRA+GnaTVe5b3OKGSqBZJ6WxK2O1LhMo9AAlkpmI7xkRYIL+RSq43E63sCIlpzuzG60STr9IGy4cUIaGNc04Phwxz/2nbnNCP5sjMHoyqBVdV+c0NCp3YYf4XxDNTcj0JHDCNMGE+uS6JZh4BLBPqEXh1N8dGPWgoCU8b4Mx0tBgI85brHV5LIy8zOQ8RS6WePCZrUyjgWWGjoLGXRVc5OH+kjFepxgWv+hTIpcwIDAQAB";
    const issuer = "http://localhost/auth/realms/master";
    const audiance = "ruan.fachini@keycloak.com";
    const scope = "web-app-front";
    if(req.headers.authorization) {
        
        const tokenString = req.headers.authorization.split(" ")[1];
        console.log(tokenString);
        const { payload, protectedHeader } = await jose.jwtVerify(tokenString, {type: keycloakPublicKey}, {
            issuer: issuer,
            audience: audiance,
        });
        
    } else {
        setUnauthorizedStatus(res);
        next();
    };

}

// function createOauthRequestBody(req: Request) {
//     const keycloakHost = "localhost";
//     const keycloakPort = "80";
//     const realmName = "master";

//     return {
//         method: 'GET',
//         url: `https://${keycloakHost}:${keycloakPort}/auth/realms/${realmName}/protocol/openid-connect/userinfo`,
//         headers: {
//           // add the token you received to the userinfo request, sent to keycloak
//           Authorization: req.headers.authorization,
//         },
//     }
// }

function setUnauthorizedStatus(res: Response) {
    res.status(401).json({
        error: `unauthorized`,
    });
}

