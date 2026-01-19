export interface PaginatedResponseDto<T> {
    data: T[];
    meta: PaginatedMetaDto;
  }
  export interface PaginatedMetaDto {
    hasNext: boolean;
    hasPrevious: boolean;
    itemCount: number;
    pageCount: number;
    page: number;
    limit: number;
  }