import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { ResponseCreateUser } from './dtos/response-create-user.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 201, type: ResponseCreateUser })
  @Post()
  createUser(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }
}
