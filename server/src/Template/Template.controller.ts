import {
  Controller,
  Get,
} from '@nestjs/common';
import { TemplateService } from './Template.service';

@Controller('')
export class TemplateController {
  constructor(private readonly TService: TemplateService) {}

  @Get("")
  default(): String {
    return this.TService.default()
  }
}
