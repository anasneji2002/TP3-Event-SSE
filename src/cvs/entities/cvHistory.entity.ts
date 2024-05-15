/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "../../users/entities/user.entity";
import { Column,  Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CvHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    operation: string;
    
    @Column()
    date: Date;
    
    @Column()
    userId: number;

    @ManyToOne(
        type => User,
        {
            cascade: ['insert', 'update'],
            nullable: true,
            eager: true
        }
    )
    user: User;

    @Column()
    cvId: number;

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

    @Column({default : null})
    path: string;
}
