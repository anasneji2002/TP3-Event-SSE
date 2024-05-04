import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/passport-jwt.strategy';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    PassportModule.register({
      defaultStrategy:'jwt'
    }),
    JwtModule.register({
      secret: process.env.SECRET_KEY ,
      signOptions: {
          expiresIn:3600
        }
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy],
  exports:[UsersService]
})
export class UsersModule {}
