import {
  Controller,
  Get,
} from '@nestjs/common';
import { PingService } from './Ping.service';

@Controller('/ping')
export class PingController {
  constructor(private readonly PService: PingService) {}

  @Get("")
  default(): string {
    return "pong"
  }
}
