import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { validate } from 'class-validator';
import { error } from 'console';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getUser() {
    return this.userService.getUser();
  }

  @Post('validar')
  async validarUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.userService.validarUser(
      createUserDto.username,
      createUserDto.password,
    );
  }

  @Get('username/:username')
  getAccountBy(@Param('username') username: string): Promise<User> {
    return this.userService.findOneByUser(username);
  }
}
