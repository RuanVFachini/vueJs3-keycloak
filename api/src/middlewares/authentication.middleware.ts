import { Request, Response } from "express";
import { Middleware } from "./types";

export default (): Middleware => {
    return (req: Request, res: Response, next: () => any) => {
        // const secret = 'secret';
        // const audience = 'http://myapi/protected';
        // const issuer = 'http://issuer';

        // const authHeader = req.headers.authorization;
    
        // console.log(authHeader);
    
        // if (authHeader) {
        //     const token = authHeader.split(' ')[1];
    
        //     jwt.verify(token, accessTokenSecret, (err, user) => {
        //         if (err) {
        //             return res.sendStatus(403);
        //         }
    
        //         req.user = user;
        //         next();
        //     });
        // } else {
        //     res.sendStatus(401);
        // }
        next();
    };
}