import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsInt, Max, Min } from 'class-validator';

export class PageQuery {
  public static readonly DEFAULT_LIMIT = 100;
  public static readonly DEFAULT_PAGE = 1;

  @ApiProperty({
    minimum: 1,
    type: Number,
    required: true,
  })
  @IsDefined({ message: 'Le paramètre "page" est requis.' })
  @Type(() => Number)
  @IsInt({ message: 'Le paramètre "page" doit être un entier.' })
  @Min(1, { message: 'Le paramètre "page" doit être supérieur ou égal à 1.' })
  public page!: number;

  @ApiProperty({
    minimum: 1,
    type: Number,
    required: true,
  })
  @IsDefined({ message: 'Le paramètre "limit" est requis.' })
  @Type(() => Number)
  @IsInt({ message: 'Le paramètre "limit" doit être un entier.' })
  @Min(1, { message: 'Le paramètre "limit" doit être supérieur ou égal à 1.' })
  @Max(1000, { message: 'Le paramètre "limit" doit être inférieur ou égal à 1000.' })
  public limit!: number;

  public static of(page: number, limit: number): PageQuery {
    return new PageQuery(page, limit);
  }

  constructor(page: number, limit: number) {
    this.page = Number(page) ?? PageQuery.DEFAULT_PAGE;
    this.limit = Number(limit) ?? PageQuery.DEFAULT_LIMIT;
  }

  get offset(): number {
    return (this.page - 1) * this.limit;
  }
}
