import { Module } from '@nestjs/common';
import { DefaultController } from './Default.controller';
import { DefaultService } from './Default.service';

@Module({
  imports: [
  ],
  controllers: [DefaultController],
  providers: [DefaultService],
})
export class DefaultModule {}
