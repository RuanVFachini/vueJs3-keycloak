import { Request, Response } from "express";
import { TOKEN } from "./auth.const";
import { IdentityUserInfoService } from "./identity.service";
import jwtdecode from "jwt-decode";
import { StatusCode } from "./../shared/types/status-code.type";
import { KeycloakJwtTokenDto } from "./identity.dtos";

export default async (req: Request, res: Response, next: () => any): Promise<void> => {
    debugger
    await new IdentityUserInfoService().getUserinfoIdentityByToken(req.headers.authorization)
    .then(userDetails => {
        debugger
        const token = req.headers.authorization!.split(' ')[1]
        const jwt = jwtdecode(token) as KeycloakJwtTokenDto
        res.locals[TOKEN] = jwt
        next();
    })
    .catch(response => setUnauthorizedStatus(res));
}

function setUnauthorizedStatus(res: Response) {
    res.status(StatusCode.Unauthorized).json({
        error: `unauthorized`,
    });
}