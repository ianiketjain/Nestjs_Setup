import { Controller, Get, Post, Body, Param, Delete, Put, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Put()
  updateUserDetails(@Body() Body: UpdateUserDto, @Req() Req: Request): Promise<object> {
    return this.userService.updateUser(Body, Req);
  }
}
