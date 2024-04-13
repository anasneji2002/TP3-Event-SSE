import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserDto{
    @IsOptional()
    username: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

}