import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.subscribe(createUserDto);
  }

  @Post('login')
  login(
    @Body() credentials:LoginCredentialsDto
  ) {
    return this.usersService.login(credentials);
  }

}
