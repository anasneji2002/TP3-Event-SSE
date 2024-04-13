import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, UseGuards} from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GetPaginatedCvDto } from './dto/get-paginated-cvs.dto';
import { UserDec } from '../decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { editFileName, imageFileFilter } from './image.filter';
import { JwtAuthGuard } from 'src/users/guards/jwt-auth.guard';



@UseGuards(JwtAuthGuard)
@Controller({ path: 'cvs', version: '1' })
export class CvsController {
  constructor(private readonly cvsService: CvsService) { }



  @Get()
  async findAll(
    @Query() queryParams,
   
    @UserDec() user: User,
  ) {
    
    return this.cvsService.getCvs(user,queryParams);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @UserDec() user: User) {
    return this.cvsService.getOneCv(id, user);
  }

 

  @Post()
  @UseInterceptors(FileInterceptor('path', {
    storage: diskStorage({
      destination: './public/uploads',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }))
  async create(
    @Body() cv: CreateCvDto,
    @UserDec() user: User,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({
          maxSize: 1048576
        })],
        fileIsRequired: false,
      })
    ) file: Express.Multer.File,
  ) {
    if (file) { cv.path = file.filename }

    return this.cvsService.create(cv, user);
  }



  @Patch(':id')
  @UseInterceptors(FileInterceptor('path', {
    storage: diskStorage({
      destination: './public/uploads',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }))
  async update(
    @Param('id') id: number,
    @Body() cv: UpdateCvDto,
    @UserDec() user: User,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({
          maxSize: 1048576
        })],
        fileIsRequired: false,
      })
    ) file: Express.Multer.File,
  ) {
    if (file) { cv.path = file.filename }
    return await this.cvsService.update(id, cv);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @UserDec() user: User
  ) {
    return this.cvsService.deleteCv(id, user);
  }
}
