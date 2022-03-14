import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/Entity/services.entity';
import { sendNotifsController } from './sendNotifs.controller';
import { sendNotifsService } from './sendNotifs.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Services])
  ],
  controllers: [sendNotifsController],
  providers: [sendNotifsService],
  exports: [sendNotifsService],
})
export class sendNotifsModule {}
