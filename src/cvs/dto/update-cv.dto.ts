import { Type } from "class-transformer";
import {IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class UpdateCvDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    firstname: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(15)
    @Max(65)
    age: number;

    @IsOptional()
    cin: number;

    @IsOptional()
    @IsString()
    job: string;

    @IsOptional()
    @IsString()
    path: string;
}
