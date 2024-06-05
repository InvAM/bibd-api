import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  createUser(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    this.userRepository.save(newUser);
  }

  getUser() {
    return this.userRepository.find();
  }

  getUserOne(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  validarUser(username: string, password: string) {
    return this.userRepository.findOneOrFail({
      where: {
        username,
        password,
      },
    });
  }

  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }

  findOneByUser(username: string) {
    return this.userRepository.findOneBy({ username });
  }
}
