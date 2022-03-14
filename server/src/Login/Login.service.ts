import {
  Injectable, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/Entity/users.entity';
import { Repository } from 'typeorm';
import jwt from 'jsonwebtoken'

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Users)
    private usersRepositoryLogin: Repository<Users>
  ) {}

  async login(mail: string, mdp: string): Promise<string> {
    const user = await this.usersRepositoryLogin.find({ email: mail });
    if (!user || user.length === 0)
      throw new NotFoundException('Mail not valid');
    if (user[0].password !== mdp)
      throw new NotFoundException('Password not valid');
    return jwt.sign({ email: mail }, 'area');
  }
}
