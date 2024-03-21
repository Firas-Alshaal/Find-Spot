import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.usersService.register(body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.usersService.login(body);
  }
}
