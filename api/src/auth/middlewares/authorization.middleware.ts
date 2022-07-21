import { Request, Response } from "express";
import { Middleware } from "./types";

export default (): Middleware => {
    return (req: Request, res: Response, next: () => any) => {
        // const authHeader = req.headers;
    
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