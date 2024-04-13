import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { UserRoleEnum } from 'src/enums/user-roles.enum';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>
  ) { }

  async create(skill: CreateSkillDto) {
    const newSkill = this.skillRepository.create(skill);
    return await this.skillRepository.save(newSkill);
  }

  async findAll() {
    return await this.skillRepository.find();
  }

  async findOne(id: number) {
    return await this.skillRepository.findOneBy({ id });
  }

  async findBydesignation(designation: string) {
    if (await this.skillRepository.findOneBy({ designation }))
      return true
    else {
      return false
    }
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    const newSkill = await this.skillRepository.preload({
      id,
      ...updateSkillDto,
    });
    if (!newSkill) {
      throw new NotFoundException(`le skill d'id ${id} n'existe pas`);
    }
    return await this.skillRepository.save(newSkill);
  }

  async remove(id: number , user) {
    const skill = await this.skillRepository.findOneBy({ id })
    if (!skill) {
      throw new NotFoundException(`le skill d'id ${id} n'existe pas`);
    }
    if (user.role === UserRoleEnum.ADMIN) {
      return await this.skillRepository.delete(id);
      
    } else {
      throw new UnauthorizedException("You are not allowed to delete this skill");
    }
  }
}
