import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import * as crypto from 'crypto';
import { extname, join } from 'path';
import { GenericHttpService } from '../http/generic-http.service';
import BunnyErrors from './bunny.errors';
import { UploadResponse } from './dto/upload-response.dto';

@Injectable()
export class BunnyFileService {
  private readonly BUNNY_CDN_URL_MEDIA = process.env.BUNNY_CDN_URL_MEDIA;
  private readonly BUNNY_STORAGE_URL_MEDIA =
    process.env.BUNNY_STORAGE_URL_MEDIA;
  private readonly BUNNY_STORAGE_PREFIX = process.env.BUNNY_STORAGE_PREFIX!;
  private readonly BUNNY_STORAGE_ACCESS_KEY_MEDIA =
    process.env.BUNNY_STORAGE_ACCESS_KEY_MEDIA;
  constructor(private readonly httpService: GenericHttpService) {}

  async uploadFile(
    file: Express.Multer.File,
    path?: string,
  ): Promise<UploadResponse> {
    const uniqueName = `${Date.now()}-${crypto.randomUUID()}`;
    const ext = extname(file.originalname);

    let fileName = `${uniqueName}${ext}`;
    if (path) fileName = path + fileName;

    // const prefix = this.BUNNY_STORAGE_PREFIX;

    const options: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/octet-stream',
        AccessKey: this.BUNNY_STORAGE_ACCESS_KEY_MEDIA,
      },
    };
    const storageUrl = this.BUNNY_STORAGE_URL_MEDIA;
    const url = `${storageUrl}/${fileName}`;
    try {
      console.log('🚀 ~ BunnyFileService ~ url:', url);
      console.log('🚀 ~ BunnyFileService ~ options:', options);
      console.log('🚀 ~ BunnyFileService ~ file.buffer:', file.buffer);
      await this.httpService.put(url, file.buffer, options);
      return {
        link: `${this.BUNNY_CDN_URL_MEDIA}/${fileName}`,
        fileName,
      };
    } catch (error) {
      console.log(
        '🚀 ~ file: bunny-file.service.ts:41 ~ BunnyFileService ~ uploadFile ~ error:',
        error,
      );
      throw new InternalServerErrorException(BunnyErrors.uploadingFileError(), {
        cause: error,
      });
    }
  }
}
