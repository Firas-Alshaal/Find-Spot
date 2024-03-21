import { IsDate, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsString()
  city!: string;

  @IsString()
  street!: string;

  @IsString()
  description!: string;

  images!: Express.Multer.File[] | string[];

  @IsNumber()
  lat!: number;

  @IsNumber()
  long!: number;

  @IsDateString()
  lostDate!: string;

  @IsString()
  categoryId!: string;
}
