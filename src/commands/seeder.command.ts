import { randEmail, randFirstName, randJobType, randLastName, randNumber, randPassword, randSkill, randUserName, seed } from '@ngneat/falso';
import { Cv } from '../cvs/entities/cv.entity';

import { CvsService } from '../cvs/cvs.service';
import { CreateCvDto } from '../cvs/dto/create-cv.dto';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateSkillDto } from '../skills/dto/create-skill.dto';
import { UsersService } from '../users/users.service';
import { SkillsService } from '../skills/skills.service';


async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const cvService = app.get(CvsService);
    const userService = app.get(UsersService);
    const skillService = app.get(SkillsService);
    

    for (let i = 0; i < 10; i++) {
        const user: CreateUserDto = {
            username: randUserName(),
            email: randEmail(),
            password: randPassword(),
        };
        await userService.subscribe(user);
    }

    for (let i = 0; i < 10; i++) {
        let skillExists = true;
        let skill;
        while (skillExists) {
            const designation = randSkill();
            skill = {
                designation: designation
            };
           
            skillExists = await skillService.findBydesignation(designation);
        }
        
        await skillService.create(skill);
    }

    for (let i = 0; i < 10; i++) {
        let tskills = [];
        const k = randNumber({ min: 3, max: 12 });

        for (let j = 3; j < k; j++) {
            const skill = await skillService.findOne(j);
            const c = tskills.push(skill);
        }
        const cv: CreateCvDto =
        {
            name: randLastName(),
            firstname: randFirstName(),
            age: randNumber({ min: 15, max: 65 }),
            cin: randNumber({ min: 10000000, max: 99999999 }),
            job: randJobType(),
            path: '',
            userId: randNumber({ min: 1, max: 10 }),
            skills: tskills
        };
        await cvService.createV2(cv, cv.userId);
    }


    await app.close();

} bootstrap();


