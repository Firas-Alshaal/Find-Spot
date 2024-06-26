import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database';
import { RegisterDto } from './dtos/register.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { EditDto } from './dtos/edit.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async register(dto: RegisterDto) {
    const oldUser = await this.prismaService.users.findFirst({
      where: {
        OR: [{ email: dto.email }, { phone_number: dto.phoneNumber }],
      },
    });
    if (oldUser) {
      throw new HttpException(
        'user already registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.prismaService.users.create({
      data: {
        name: dto.name,
        password: await this.hash(dto.password),
        email: dto.email,
        phone_number: dto.phoneNumber,
      },
    });
    const accessToken = await this.generateAccessToken(user);

    return { accessToken, user };
  }

  async login(dto: LoginDto) {
    const user = await this.prismaService.users.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user)
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
    const isEqual = await this.compare(dto.password, user.password);
    if (!isEqual)
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);

    const accessToken = await this.generateAccessToken(user);
    return { accessToken, user };
  }

  async editUser(dto: EditDto) {
    // Check if the user exists
    const user = await this.prismaService.users.findUnique({
      where: { id: dto.id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    let currentPassword;

    const isEqual = dto.password == user.password; //await this.compare(dto.password, user.password);
    if (isEqual) {
      currentPassword = user.password;
    } else {
      currentPassword = await this.hash(dto.password);
    }

    // Update user details
    const updatedUser = await this.prismaService.users.update({
      where: { id: dto.id },
      data: {
        name: dto.name,
        password: currentPassword,
        email: dto.email,
        phone_number: dto.phone_number,
      },
    });

    return updatedUser;
  }

  async generateAccessToken(user) {
    return this.jwtService.signAsync(
      { sub: user.id, email: user.email },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '30d', //process.env.JWT_EXPIRATION,
      },
    );
  }
  async hash(data: string | Buffer): Promise<string> {
    const salt = await genSalt();
    return hash(data, salt);
  }
  async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return await compare(data, encrypted);
  }
}
