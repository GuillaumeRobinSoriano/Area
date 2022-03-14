import { Module } from '@nestjs/common';
import { AboutController } from './About.controller';
import { AboutService } from './About.service';

@Module({
  imports: [],
  controllers: [AboutController],
  providers: [AboutService],
})
export class AboutModule {}