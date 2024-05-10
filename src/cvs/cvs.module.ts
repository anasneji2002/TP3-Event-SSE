import { Module } from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CvsController } from './cvs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { CvsControllerV2 } from './cvs2.controller';
import { User } from '../users/entities/user.entity';
import { CvListener } from './cvListener.service';
import { CvHistory } from './entities/cvHistory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cv,User,CvHistory])],
  controllers: [CvsController, CvsControllerV2],
  providers: [CvsService,CvListener],
  exports: [CvsService]
})
export class CvsModule { }
