import { HttpStatus } from '@nestjs/common';

export class ResponseHelper {
  constructor() {}

  async success(data: [] | {}, message = 'Success') {
    return {
      data: data,
      errorCode: 0,
      message,
      errors: [],
    };
  }

  async created(data: {}, message = 'Created') {
    return {
      data,
      errorCode: 0,
      message,
      errors: [],
    };
  }

  async noContent(data: [] | {}, message = 'No Content') {
    return {
      data,
      errorCode: 0,
      message,
      errors: [],
    };
  }

  async badRequest(message: string, errorCode: number, errors: []) {
    return {
      data: [],
      errorCode,
      message,
      errors,
    };
  }

  async unauthorized(message: string, errorCode: number, errors: []) {
    return {
      data: [],
      errorCode,
      message,
      errors,
    };
  }

  async forbidden(message: string, errorCode: number, errors: []) {
    return {
      data: [],
      message,
      errorCode,
      errors,
    };
  }

  async notFound(data: [] | {}, message: string, errors?: []) {
    return {
      data,
      message,
      errorCode: 0,
      errors,
    };
  }

  async resourceExist(message: string, errorCode: number, errors: []) {
    return {
      data: [],
      message,
      errorCode,
      errors,
    };
  }

  async unsupportedMedia(message: string, errorCode: number, errors: []) {
    return {
      data: [],
      message,
      errorCode,
      errors,
    };
  }

  async internalServerError(message: string, errorCode: number, errors: []) {
    return {
      data: [],
      message,
      errorCode,
      errors,
    };
  }
}
