import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { Skill } from "../../skills/entities/skill.entity";

export class CreateCvDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(15)
    @Max(65)
    age: number;

    @IsNotEmpty()
    cin: number;

    @IsNotEmpty()
    @IsString()
    job: string;

    @IsOptional()
    @IsString()
    path: string;

    @IsOptional()
    userId: number
    
    @IsOptional()
    skills:Skill[]

}
