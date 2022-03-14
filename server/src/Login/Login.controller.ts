import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post
} from '@nestjs/common';
import { Users } from 'src/Entity/users.entity';
import { LoginService } from './Login.service';

@Controller('/login')
export class LoginController {
  constructor(private readonly LService: LoginService) {}

  @Post("")
  @Header('content-type', 'application/json')
  login(
    @Body('email') userEmail: string,
    @Body('password') userPasword: string,
  ): Promise<string> {
    return this.LService.login(userEmail, userPasword);
  }
}
