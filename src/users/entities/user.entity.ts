import { UserRoleEnum } from "../../enums/user-roles.enum";
import { Cv } from "../../cvs/entities/cv.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('user')
export class User { 
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        unique: true,
        length:50
    })
    username: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column({
        type: 'enum',
        enum: UserRoleEnum,
        default: UserRoleEnum.USER
    })
    role: string;

    @OneToMany(
        () => Cv,
        (cv) => cv.user,
        {
            nullable: true,
            cascade: true
        }
    )
    cvs: Cv[];

  
}
