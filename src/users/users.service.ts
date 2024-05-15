import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {

  }
  async subscribe(userData: CreateUserDto): Promise<Partial<User>> {
    const { username, password, email, role } = userData;
    const user = this.userRepository.create({
      ...userData,
    });
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);


    try {
      await this.userRepository.save(user);
    } catch (e) {
      throw new ConflictException(`le username et le email doivent etre unique`);
    }
    return {
      id: user.id,
      username: username,
      email: email,
      role: role
    };
  }

  async login(credentials: LoginCredentialsDto) {
    const { login, password } = credentials;
    const user = await this.userRepository.createQueryBuilder("user")
      .where("user.username = :login or user.email= :login",
        { login })
      .getOne();
    if (!user) {
      throw new NotFoundException('username ou password erronée');
    }
    //const hashedPassword = await bcrypt.hash(password, user.salt);
    const match = await bcrypt.compare(password, user.password)
    if (match) {
      const payload = {
        username: user.username,
        email: user.email,
        role: user.role,
      }
      const jwt = await this.jwtService.sign(payload);
      return {
        "access_token": jwt
      }
    } else {
      throw new NotFoundException('username ou password erronée');
    }
  }


  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async updateUser(user: User, updates: UpdateUserDto) {
    const id = user.id
    const updatedUser = await this.userRepository.preload({
      id,
      ...updates,
    });
    return await this.userRepository.save(updatedUser);
  }

}