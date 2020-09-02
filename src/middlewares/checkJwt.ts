import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import {AuthService} from "../service/auth/auth.service";
import {JwtPayload} from "./types/JwtPayload";
import config from "../config";

const UNAUTHORIZED_RES = {
    success: false,
    message: 'Invalid token provided'
};

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    try{
        let token = AuthService.getTokenFromRequestHeader(req);
        let jwtPayload;

        if(token){
            //Try to validate the token and get data
            try {
                jwtPayload = <any>jwt.verify(token, config.jwtSecret);
                res.locals.jwtPayload = jwtPayload;
            } catch (error) {
                //If token is not valid, respond with 401 (unauthorized)
                return res.status(401).json(UNAUTHORIZED_RES);
            }

            //The token is valid for 1 hour
            //We want to send a new token on every request
            const user: JwtPayload = new JwtPayload(jwtPayload);
            const newToken = jwt.sign(user.toObject(), config.jwtSecret, {
                expiresIn: "1h"
            });
            res.setHeader("access-token", newToken);

            //Call the next middleware or controller
            next();
        } else {
            return res.status(401).json(UNAUTHORIZED_RES);
        }
    } catch (e) {
        console.log(e);
        return res.status(401).json(UNAUTHORIZED_RES);
    }
};
