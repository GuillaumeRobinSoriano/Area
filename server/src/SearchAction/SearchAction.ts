import {
  Controller,
  Get,
} from '@nestjs/common';
import { SearchActionService } from './SearchAction.service';

@Controller('')
export class SearchActionController {
  constructor(private readonly ytbService: SearchActionService) {}

  @Get("/searchAction")
  default(): String[] {
    console.log("searchAction endPoint")
    return ["lucas", "max", "meuhmeuh", "lolo", "double gui", "tete ecrou"]
  }
}
