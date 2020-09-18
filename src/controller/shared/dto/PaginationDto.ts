export class PaginationDto<T> {
    private readonly data: T[];
	private readonly page: number;
	private readonly totalPages: number;
	private readonly entriesPerPage: number;
	private readonly totalEntries: number;

	constructor(data: T[], page: number, totalPages: number, entriesPerPage: number, totalEntries: number) {
		this.data = data;
		this.page = page;
		this.totalPages = totalPages;
		this.entriesPerPage = entriesPerPage;
		this.totalEntries = totalEntries;
	}
}
