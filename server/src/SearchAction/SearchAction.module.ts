import { Module } from '@nestjs/common';
import { SearchActionController } from './SearchAction';
import { SearchActionService } from './SearchAction.service';

@Module({
  imports: [
  ],
  controllers: [SearchActionController],
  providers: [SearchActionService],
})
export class SearchActionModule {}
