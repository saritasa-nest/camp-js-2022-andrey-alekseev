const DEFAULT_PAGE_SIZE = 10;

/** Pagination data. */
export class Pagination {
  /** Current page. */
  public page: number;

  /** Page size. */
  public pageSize: number;

  /** Total count. */
  public totalCount: number;

  public constructor(page?: number, pageSize?: number, totalCount?: number) {
    this.page = page ?? 0;
    this.pageSize = pageSize ?? DEFAULT_PAGE_SIZE;
    this.totalCount = totalCount ?? 1;
  }
}
