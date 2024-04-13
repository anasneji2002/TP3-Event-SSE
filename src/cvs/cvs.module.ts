import { Module } from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CvsController } from './cvs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { CvsControllerV2 } from './cvs2.controller';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cv,User])],
  controllers: [CvsController, CvsControllerV2],
  providers: [CvsService],
  exports: [CvsService]
})
export class CvsModule { }
