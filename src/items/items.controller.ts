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
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateItemDto } from './dtos/create-item.dto';
import { ItemsService } from './items.service';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { ItemTypeEnum } from './enums/item-type.enum';

@UseGuards(AccessTokenGuard)
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @UseInterceptors(
    FilesInterceptor('images', 4, {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = file.originalname.split('.').pop();
          cb(null, `${uuidv4()}-${uniqueSuffix}.${extension}`);
        },
      }),
    }),
  )
  @Post('lost')
  async addLostItem(
    @Body() item: CreateItemDto,
    @UploadedFiles() images: Express.Multer.File[],
    @GetUser() user: { sub: string; email: string },
  ) {
    item.images = images.map((img) => img.filename);
    return { data: await this.itemsService.addLostItem(item, true, user.sub) };
  }

  @UseInterceptors(
    FilesInterceptor('images', 4, {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = file.originalname.split('.').pop();
          cb(null, `${uuidv4()}-${uniqueSuffix}.${extension}`);
        },
      }),
    }),
  )
  @Post('found')
  async addFoundItem(
    @Body() item: CreateItemDto,
    @UploadedFiles() images: Express.Multer.File[],
    @GetUser() user: { sub: string; email: string },
  ) {
    item.images = images.map((img) => img.filename);
    return {
      data: await this.itemsService.addFoundItem(item, false, user.sub),
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
