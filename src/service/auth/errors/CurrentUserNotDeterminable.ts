export class CurrentUserNotDeterminable extends Error {
    status: number = 401;

    constructor(message: string) {
        super();
        this.message = message;
    }
}
