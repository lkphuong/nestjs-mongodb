import { HttpStatus } from '@nestjs/common';

export class ResponseHelper {
  constructor(private readonly res: any) {}

  async success(data: [] | {}, message = 'Success') {
    return this.res.status(HttpStatus.OK).json({
      data: data,
      errorCode: 0,
      message,
      errors: [],
    });
  }

  async created(data: {}, message = 'Created') {
    return this.res.status(HttpStatus.CREATED).json({
      data,
      errorCode: 0,
      message,
      errors: [],
    });
  }

  async noContent(data: [] | {}, message = 'No Content') {
    return this.res.status(HttpStatus.OK).json({
      data,
      errorCode: 0,
      message,
      errors: [],
    });
  }

  async badRequest(message: string, errorCode: number, errors: []) {
    return this.res.status(HttpStatus.BAD_REQUEST).json({
      data: [],
      errorCode,
      message,
      errors,
    });
  }

  async unauthorized(message: string, errorCode: number, errors: []) {
    return this.res.status(HttpStatus.UNAUTHORIZED).json({
      data: [],
      errorCode,
      message,
      errors,
    });
  }

  async forbidden(message: string, errorCode: number, errors: []) {
    return this.res.status(HttpStatus.FORBIDDEN).json({
      data: [],
      message,
      errorCode,
      errors,
    });
  }

  async notFound(data: [] | {}, message: string, errors?: []) {
    return this.res.status(HttpStatus.NOT_FOUND).json({
      data,
      message,
      errorCode: 0,
      errors,
    });
  }

  async resourceExist(message: string, errorCode: number, errors: []) {
    return this.res.status(409).json({
      data: [],
      message,
      errorCode,
      errors,
    });
  }

  async unsupportedMedia(message: string, errorCode: number, errors: []) {
    return this.res.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).json({
      data: [],
      message,
      errorCode,
      errors,
    });
  }

  async internalServerError(message: string, errorCode: number, errors: []) {
    return this.res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      data: [],
      message,
      errorCode,
      errors,
    });
  }
}
