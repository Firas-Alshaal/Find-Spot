import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// TODO: create an interface for active user
export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request['user'];
  },
);
