import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';

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

  findAll() {
    return `This action returns all skills`;
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

  update(id: number, updateSkillDto: UpdateSkillDto) {
    return `This action updates a #${id} skill`;
  }

  remove(id: number) {
    return `This action removes a #${id} skill`;
  }
}
