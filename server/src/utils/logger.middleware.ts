import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      (statusCode === 200 || statusCode === 201) ? this.logger.log(
        `\x1b[42m\x1b[30m${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}\x1b[0m`,
      ) : this.logger.log(
        `\x1b[41m\x1b[30m${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}\x1b[0m`,
      )
    });

    next();
  }
}