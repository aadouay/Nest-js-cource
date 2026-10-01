import { IsString, IsNumber, IsNotEmpty, IsPositive } from "class-validator";

export class CreateProductDto{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;
}