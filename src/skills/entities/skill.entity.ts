import { Cv } from "../../cvs/entities/cv.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({

        unique:true,
    })
    designation: string;

    @ManyToMany(
        () => Cv,
        (cv) => cv.skills,
        {
            nullable: true,
            cascade: ['insert', 'update'],
        }
    )
    cvs: Cv[];
}
