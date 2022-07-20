import { Request, Response } from "express";

export default async (req: Request, res: Response, next: () => any): Promise<void> => {
    if(req.headers.authorization) {
        
        

        let a = 1;
        
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

