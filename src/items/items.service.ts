import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database';
import { CreateItemDto } from './dtos/create-item.dto';
import { ItemTypeEnum } from './enums/item-type.enum';
// import * as moment from 'moment';
// import { log } from 'console';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}

  async addLostItem(dto: CreateItemDto, isLost: boolean, userId: string) {
    return await this.prismaService.items.create({
      data: {
        city: dto.city,
        street: dto.street,
        name: dto.name,
        description: dto.description,
        images: dto.images as unknown as string[],
        location: [dto.long, dto.lat],
        lost_date: dto.lostDate,
        user_id: userId,
        is_lost: isLost,
        category_id: dto.categoryId,
      },
    });
  }

  async addFoundItem(dto: CreateItemDto, isLost: boolean, userId: string) {
    return await this.prismaService.items.create({
      data: {
        city: dto.city,
        street: dto.street,
        name: dto.name,
        description: dto.description,
        images: dto.images as unknown as string[],
        location: [dto.long, dto.lat],
        lost_date: dto.lostDate,
        user_id: userId,
        is_lost: isLost,
        category_id: dto.categoryId,
      },
    });
  }

  async getItems(lostType: ItemTypeEnum) {
    const isLost =
      lostType === ItemTypeEnum.BOTH
        ? undefined
        : lostType === ItemTypeEnum.FOUND
          ? false
          : true;
    return await this.prismaService.items.findMany({
      where: { is_lost: isLost },
      include: { user: true, category: true },
    });
  }

  async searchItems(query: {
    categoryId?: string;
    date?: string;
    location?: string;
    name?: string;
  }) {
    const where: any = {};
    if (query.categoryId) where.category_id = query.categoryId;
    if (query.location)
      where.OR = [
        { street: { contains: query.location } },
        { city: { contains: query.location } },
      ];
    if (query.name) where.name = { contains: query.name };
    if (query.date)
      where.lost_date = {
        lte: new Date(new Date(query.date).setUTCHours(0, 0, 0, 0)),
        gte: new Date(new Date(query.date).setUTCHours(23, 59, 59, 999)),
      };

    return await this.prismaService.items.findMany({
      where: { ...where },
      include: { user: true, category: true },
    });
  }

  delete(id: string) {
    return this.prismaService.items.delete({ where: { id } });
  }
}
