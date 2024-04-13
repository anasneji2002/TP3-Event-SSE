import { Type } from "class-transformer";
import { IsAlphanumeric, IsNumber, IsOptional, IsString } from "class-validator";

export class GetCvDto {

    @IsOptional()
    @IsString()
    critere: string;

    @IsOptional()
    @IsNumber()
    age: number
}