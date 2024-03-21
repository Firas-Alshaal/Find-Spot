import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL, 10),
}));
