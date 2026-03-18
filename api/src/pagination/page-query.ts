import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class PageQuery {
  public static readonly DEFAULT_LIMIT = 100;
  public static readonly DEFAULT_PAGE = 1;

  @ApiPropertyOptional({
    minimum: 1,
    default: PageQuery.DEFAULT_PAGE,
    type: Number,
  })
  @IsNumber()
  @Transform(({ value }) =>
    toNumber(value as string, { default: PageQuery.DEFAULT_PAGE, min: 1 }),
  )
  public page: number = PageQuery.DEFAULT_PAGE;

  @ApiPropertyOptional({
    minimum: 1,
    default: PageQuery.DEFAULT_LIMIT,
    type: Number,
  })
  @Transform(({ value }) =>
    toNumber(value as string, { default: PageQuery.DEFAULT_LIMIT, min: 1 }),
  )
  public limit: number = PageQuery.DEFAULT_LIMIT;

  public static of(page: number, limit: number): PageQuery {
    const dto = new PageQuery(page, limit);
    return dto;
  }

  get offset(): number {
    return (this.page - 1) * this.limit;
  }

  constructor(page: number, limit: number) {
    this.page = Number(page);
    this.limit = Number(limit);
  }
}

interface ToNumberOptions {
  default?: number;
  min?: number;
  max?: number;
}

function toNumber(value: string, opts: ToNumberOptions = {}): number {
  let newValue: number = Number.parseInt(value || String(opts.default), 10);

  if (Number.isNaN(newValue)) {
    newValue = opts.default!;
  }

  if (opts.min) {
    if (newValue < opts.min) {
      newValue = opts.min;
    }

    if (newValue > opts.max!) {
      newValue = opts.max!;
    }
  }

  return newValue;
}
