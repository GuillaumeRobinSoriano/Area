import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/Entity/services.entity';
import { ServicesController } from './Services.controller';
import { ServicesService } from './Services.service';

@Module({
  imports: [TypeOrmModule.forFeature([Services])],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
