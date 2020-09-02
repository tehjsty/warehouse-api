import {Request} from "express";
import * as jwt from "jsonwebtoken";
import {CurrentUserNotDeterminable} from "./errors/CurrentUserNotDeterminable";
import {JwtPayload} from "../../middlewares/types/JwtPayload";
import {Unauthorized} from "./errors/Unauthorized";

export class AuthService {

    /**
     * Get the userId from currently logged in user
     * @param req
     */
    public static getTokenPayload(req: Request): JwtPayload {
        let accessToken = AuthService.getTokenFromRequestHeader(req);

        if(accessToken) {
            return jwt.decode(accessToken) as JwtPayload;
        }

        throw new CurrentUserNotDeterminable("Could not extract user data from token");
    }

    public static getTokenFromRequestHeader(req: Request): string {
        let token = <string>req.headers["authorization"];
        if(token && token.startsWith('Bearer ')){
            // Remove Bearer from string
            token = token.slice(7, token.length);
            return token;
        } else {
            throw new Unauthorized();
        }
    }

}
