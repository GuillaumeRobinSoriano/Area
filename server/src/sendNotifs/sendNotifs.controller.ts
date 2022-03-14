import {
  Controller,
  Get,
} from '@nestjs/common';
import { sendNotifsService } from './sendNotifs.service';

@Controller('')
export class sendNotifsController {
  constructor(private readonly SNService: sendNotifsService) {}
}
