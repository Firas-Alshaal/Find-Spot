import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { EditDto } from './dtos/edit.dto';
import { UsersService } from './users.service';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
// import { GetUser } from 'src/common/decorators/get-user.decorator';

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

  @UseGuards(AccessTokenGuard)
  @Put('edit')
  async edit(@Body() body: EditDto) {
    return await this.usersService.editUser(body);
  }
}
