import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async seed() {
    const categories = [
      { name: 'phone' },
      { name: 'money' },
      { name: 'key' },
      { name: 'bag' },
      { name: 'others' },
    ];
    await this.prismaService.categories.createMany({
      data: categories,
      skipDuplicates: true,
    });
  }
  async findAll() {
    return await this.prismaService.categories.findMany();
  }
}
