import {Request, Response} from "express";
import {AuthService} from "../../service/auth/auth.service";
import {UserService} from "../../service/user/user.service";
import {UserDto} from "./dto/UserDto";
import {ErrorResponse} from "../error/ErrorResponse";

export class UserController {

    static newUser = async (req: Request, res: Response) => {
        //Get parameters from the body
        let {username, password} = req.body;

        const service: UserService = new UserService();
        service.create(username, password).then(() => {
            res.status(200).send();
        }, e => new ErrorResponse(e).sendResponse(res))

        //If all ok, send 201 response
        res.status(201).send("User created");
    };

    public static myself(req: Request, res: Response): any {
        try {
            const userId = AuthService.getTokenPayload(req).userId;
            const service: UserService = new UserService();
            service.findById(userId).then((user: UserDto) => {
                res.status(200).json(user);
            }, e => new ErrorResponse(e).sendResponse(res))
        } catch (e) {
            new ErrorResponse(e).sendResponse(res)
        }
    }

}
