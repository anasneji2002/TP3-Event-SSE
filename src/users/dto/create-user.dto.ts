import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { UserRoleEnum } from "src/enums/user-roles.enum";

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    role:UserRoleEnum ;

}
