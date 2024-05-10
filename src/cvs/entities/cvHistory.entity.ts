import { User } from "../../users/entities/user.entity";
import { Column,  Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cv } from "./cv.entity";

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

    @ManyToOne(
        type => Cv,
        {
            cascade: ['insert', 'update'],
            nullable: true,
            eager: true
        }
    )
    cv: Cv;
}
