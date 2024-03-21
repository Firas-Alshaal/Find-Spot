import { Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('seed')
  seed() {
    return this.categoriesService.seed();
  }

  @Get()
  async findAll() {
    return { data: await this.categoriesService.findAll() };
  }
}
