import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetCvDto } from './dto/get-cv.dto';
import { User } from '../users/entities/user.entity';
import { UserRoleEnum } from '../enums/user-roles.enum';
import { GetPaginatedCvDto } from './dto/get-paginated-cvs.dto';



@Injectable()
export class CvsService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async create(cv: CreateCvDto, user): Promise<Cv> {
    const newCv = await this.cvRepository.create(cv);
    newCv.user = user;
    return await this.cvRepository.save(newCv);
  }

  async createV2(cv: CreateCvDto, userId: number): Promise<Cv> {
    const newCv = await this.cvRepository.create(cv);
    const user = await this.userRepository.findOneBy({ id: userId });
    newCv.user = user;
    return await this.cvRepository.save(newCv);
  }

  async getCvs(user: User, queryParams: GetPaginatedCvDto): Promise<Cv[]> {
    const { page, size } = queryParams;
    const skip = (page - 1) * size;
    const userId = user.id;
    console.log(page, size)
    let qb = this.cvRepository.createQueryBuilder("cv");
    if (user.role === UserRoleEnum.ADMIN) {
      if (!page && !size) {
        return this.cvRepository.find()
      } else if (!page) {
        return qb.limit(size).getMany();
      } else if (!size) {
        return qb.skip((page - 1) * 10).getMany()
      } else {
        return qb.skip(skip).take(size).getMany();
      }

    } else {
      if (!page && !size) {
        return this.cvRepository.find({ where: { user: { id: userId } } })
      } else if (!page) {
        return qb.limit(size).where("cv.userId= :userId").setParameters({ userId }).getMany();
      } else if (!size) {
        return qb.skip(0).take(size).where("cv.userId= :userId").setParameters({ userId }).getMany();
      } else {
        return qb.skip(skip).take(size).where("cv.userId= :userId").setParameters({ userId }).getMany();
      }
    }


  }

  async getCvsByCriteria(criteria: GetCvDto): Promise<Cv[]> {
    if (criteria.age || criteria.critere) {
      return await this.cvRepository.find({
        where: [
          { firstname: Like(`%${criteria.critere}%`) },
          { name: Like(`%${criteria.critere}%`) },
          { job: Like(`%${criteria.critere}%`) },
          { age: criteria.age },
        ]
      })
    } else {
      return await this.cvRepository.find();
    }

  }

  async getOneCv(id: number, user): Promise<Cv> {
    if (user.role === UserRoleEnum.ADMIN)
      return await this.cvRepository.findOneBy({ id });
    return await this.cvRepository.findOneBy({ id, user: { id: user.id } });
  }
  async getOneCvV2(id: number): Promise<Cv> {
    return await this.cvRepository.findOneBy({ id });
  }

  async update(id: number, cv: UpdateCvDto): Promise<Cv> {
    const newCv = await this.cvRepository.preload({
      id,
      ...cv,
    });
    if (!newCv) {
      throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
    }
    return await this.cvRepository.save(newCv);
  }

  async updateV2(id: number, cv: UpdateCvDto, userId: number): Promise<Cv> {
    const newCv = await this.cvRepository.preload({
      id,
      ...cv,

    });
    if (!newCv) {
      throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
    }
    const oldCv = await this.cvRepository.findOneBy({ id });
    if (oldCv.user.id === userId) {
      return await this.cvRepository.save(newCv);
    } else {
      throw new UnauthorizedException("You are not allowed to update this cv");
    }

  }

  async deleteCv(id: number, user) {
    const cv = await this.cvRepository.findOneBy({ id })
    if (!cv) {
      throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
    }
    if (cv.user.id === user.id || user.role === UserRoleEnum.ADMIN) {
      return await this.cvRepository.delete(id);

    } else {
      throw new UnauthorizedException("You are not allowed to delete this cv");
    }

  }


  async deleteCvV2(id: number, userId: number) {
    const cv = await this.cvRepository.findOneBy({ id })
    if (!cv) {
      throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
    }
    if (cv.user.id !== userId) {
      throw new UnauthorizedException("You are not allowed to delete this cv");
    }
    return await this.cvRepository.delete(id);
  }
}
