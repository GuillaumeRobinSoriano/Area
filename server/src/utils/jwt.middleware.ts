import { Injectable, NestMiddleware, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { Users } from 'src/Entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async use(request: Request, response: Response, next: NextFunction): Promise<void> {
    const jwtoken = request.rawHeaders[request.rawHeaders.findIndex(item => item === 'jwt') + 1]
    try {
      const userInfo: any = jwt.verify(jwtoken, 'area')
      const user = await this.usersRepository.find({ email: userInfo.email });
      if (!user)
        throw new UnauthorizedException('Could not find the user by username.');
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException('Invalid token');
    }

    next();
  }
}