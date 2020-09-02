export class JwtPayload {
    userId: number;
    username: string;

    constructor(jwtPayload: {userId: number; username: string}) {
        this.userId = jwtPayload.userId;
        this.username = jwtPayload.username;
    }

    toObject(): {userId: number; username: string} {
        return {
            username: this.username,
            userId: this.userId
        }
    }
}
