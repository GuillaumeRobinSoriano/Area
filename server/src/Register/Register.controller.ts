import { Controller, Post, Header, Body } from '@nestjs/common';
import { Users } from 'src/Entity/users.entity';
import { RegisterService } from './Register.service';

@Controller('/')
export class RegisterController {
  constructor(private readonly RService: RegisterService) {}

  @Post('/register')
  @Header('content-type', 'application/json')
  registerNewUser(
    @Body('email') userEmail: string,
    @Body('name') userName: string,
    @Body('password') userPasword: string,
  ): Promise<string> {
    return this.RService.register(userEmail, userName, userPasword);
  }
}
