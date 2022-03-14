import {
  Controller,
  Get,
} from '@nestjs/common';
import { DefaultService } from './Default.service';

@Controller('')
export class DefaultController {
  constructor(private readonly ytbService: DefaultService) {}

  @Get("")
  default(): String {
    return this.ytbService.default()
  }
}
