import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { GetCvDto } from './dto/get-cv.dto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './image.filter';


@Controller({ path: 'cvs', version: '2' })
export class CvsControllerV2 {
  constructor(private readonly cvsService: CvsService) { }

  @Get()
  async findAll(
    @Query() criteria: GetCvDto,
  ) {
    
    return this.cvsService.getCvsByCriteria(criteria);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    
    return this.cvsService.getOneCvV2(id,);
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
    @Req() req: Request,
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
    return this.cvsService.createV2(cv, +req["userId"]);
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
    @Req() req: Request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({
          maxSize: 1048576
        })],
        fileIsRequired: false,
      })
    ) file: Express.Multer.File,
  ) {
    const userId = req["userId"];
    if (file) { cv.path = file.filename }
    return await this.cvsService.updateV2(id, cv, +userId);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @Req() req: Request
  ) {
    return this.cvsService.deleteCvV2(id, +req["userId"]);
  }
}
