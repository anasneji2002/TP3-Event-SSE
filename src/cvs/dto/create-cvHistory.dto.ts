import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateCvHistoryDto {

    @IsNotEmpty()
    @IsString()
    operation: string;

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsNotEmpty()
    userId: number
    
    @IsNotEmpty()
    cvId: number

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    firstname: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
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

