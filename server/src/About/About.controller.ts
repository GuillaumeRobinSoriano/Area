import {
  Controller,
  Post,
  Body,
  Get,
  Request
} from '@nestjs/common';
import { AboutService } from './About.service';

@Controller('/about.json')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get("/")
  aboutJson(@Request() req) : any {
    return this.aboutService.aboutJson(req);
  }
}
