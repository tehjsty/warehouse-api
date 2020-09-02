export class Unauthorized extends Error {
	status: number = 401;

	constructor() {
		super();
		this.message = "Unauthorized";
	}
}
