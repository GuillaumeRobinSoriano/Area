import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/Entity/users.entity';
import { RegisterController } from './Register.controller';
import { RegisterService } from './Register.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
    controllers: [RegisterController],
    providers: [RegisterService],
    exports: [RegisterService]
})
export class RegisterModule {}
