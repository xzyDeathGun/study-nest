import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// class-based
// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log('request...');
//     next();
//   }
// }

export const LoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('request...');
  next();
};
