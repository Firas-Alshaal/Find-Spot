import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  // FilesInterceptor,
} from '@nestjs/platform-express';
import { CreateItemDto } from './dtos/create-item.dto';
import { ItemsService } from './items.service';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
// import { MulterError, diskStorage } from 'multer';
// import { v4 as uuidv4 } from 'uuid';
import { ItemTypeEnum } from './enums/item-type.enum';

@UseGuards(AccessTokenGuard)
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @UseInterceptors(AnyFilesInterceptor({}))
  @Post('lost')
  async addLostItem(
    @Body() item: CreateItemDto,
    @UploadedFiles() images: Express.Multer.File[],
    @GetUser() user: { sub: string; email: string },
  ) {
    // item.images = images.map((img) => img.filename);

    return {
      data: await this.itemsService.addLostItem(
        { ...item, images },
        true,
        user.sub,
      ),
    };
  }

  @UseInterceptors(AnyFilesInterceptor({}))
  @Post('found')
  async addFoundItem(
    @Body() item: CreateItemDto,
    @UploadedFiles() images: Express.Multer.File[],
    @GetUser() user: { sub: string; email: string },
  ) {
    return {
      data: await this.itemsService.addFoundItem(
        { ...item, images },
        false,
        user.sub,
      ),
    };
  }

  @Get()
  async getItems(@Query('lostType') lostType: ItemTypeEnum) {
    return { data: await this.itemsService.getItems(lostType) };
  }

  @Get('search')
  async searchItems(
    @Query()
    query: {
      categoryId?: string;
      date?: string;
      location?: string;
      name?: string;
    },
  ) {
    return { data: await this.itemsService.searchItems(query) };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.itemsService.delete(id);
  }
}
