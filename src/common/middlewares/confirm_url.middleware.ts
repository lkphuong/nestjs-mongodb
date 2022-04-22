import { Request, Response, NextFunction } from 'express';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ConfirmUrl implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    const token = req.originalUrl.slice(20);
    jwt.verify(token, process.env.JWT_SECRET, (error, result) => {
      if (error)
        throw new UnauthorizedException(
          1001,
          'Cần phải đăng nhập trước khi gọi request',
        );
      req.user = result;
      next();
    });
  }
}
