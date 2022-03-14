import { Module } from '@nestjs/common';
import { PingController } from './Ping.controller';
import { PingService } from './Ping.service';

@Module({
  // imports: [TypeOrmModule.forFeature([Users])], //si entity
    controllers: [PingController],
    providers: [PingService],
    exports: [PingService]
})
export class PingModule {}
