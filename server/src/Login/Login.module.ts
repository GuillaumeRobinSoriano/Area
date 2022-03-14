import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/Entity/users.entity';
import { LoginController } from './Login.controller';
import { LoginService } from './Login.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
    controllers: [LoginController],
    providers: [LoginService],
    exports: [LoginService]
})
export class LoginModule {}
