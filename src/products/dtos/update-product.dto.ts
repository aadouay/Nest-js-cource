import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;
}
