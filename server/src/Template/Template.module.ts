import { Module } from '@nestjs/common';
import { TemplateController } from './Template.controller';
import { TemplateService } from './Template.service';

@Module({
  // imports: [TypeOrmModule.forFeature([Users])], //si entity
    controllers: [TemplateController],
    providers: [TemplateService],
    exports: [TemplateService]
})
export class TemplateModule {}
