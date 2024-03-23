import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsString()
  city!: string;

  @IsString()
  street!: string;

  @IsString()
  description!: string;

  images!: Express.Multer.File[];

  @IsNumber()
  lat!: number;

  @IsNumber()
  long!: number;

  @IsDateString()
  lostDate!: string;

  @IsString()
  categoryId!: string;

  // files: Express.Multer.File[];
}
