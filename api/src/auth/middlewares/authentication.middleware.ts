import { Request, response, Response } from "express";
import { IdentityUserInfoService } from "../services/identity.service";

export default async (req: Request, res: Response, next: () => any): Promise<void> => {
    await new IdentityUserInfoService().getUserinfoIdentityByToken(req.headers.authorization)
    .then(response => {
        
    })
    .catch(response => setUnauthorizedStatus(res));

    next();
}

function setUnauthorizedStatus(res: Response) {
    res.status(401).json({
        error: `unauthorized`,
    });
}