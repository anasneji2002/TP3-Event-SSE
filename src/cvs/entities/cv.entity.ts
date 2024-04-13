import { Skill } from "../../skills/entities/skill.entity";
import { User } from "../../users/entities/user.entity";
import { Column,  Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cv {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    firstname: string;
    
    @Column()
    age: number;

    @Column()
    cin: number;

    @Column()
    job: string;

    @Column()
    path: string;

    @ManyToOne(
        type => User,
        user => user.cvs,
        {
            cascade: ['insert', 'update'],
            nullable: true,
            eager: true
        }
    )
    user: User;

    @ManyToMany(
        () => Skill,
        (skill) => skill.cvs,
        {
            eager: true,
            cascade:true,
            nullable:true,
        }
    )
    @JoinTable()
    skills:Skill[]

}
