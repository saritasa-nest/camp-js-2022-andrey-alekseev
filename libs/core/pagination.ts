/** Pagination data. */
export class PaginationData {
  /** Current page. */
  public page: number;

  /** Page size. */
  public pageSize: number;

  /** Total count. */
  public totalCount: number;

  private defaultPageSize = 10;

  public constructor(page?: number, pageSize?: number, totalCount?: number) {
    this.page = page ?? 1;
    this.pageSize = pageSize ?? this.defaultPageSize;
    this.totalCount = totalCount ?? 1;
  }

  /** Get offset. */
  public get offset(): number {
    return this.pageSize * (this.page - 1);
  }
}
