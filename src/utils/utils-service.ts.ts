import { Injectable } from '@nestjs/common';
import { ApiResponseDto } from './api-response';

@Injectable()
export class UtilsService {

    constructor() {}

    apiResponse<T>(statusCode: number, data: any = null, messages: {message:string,property:string}[] | [] = []): ApiResponseDto<T> {
        return {
          statusCode,
          messages,
          data,
        };
      }

}