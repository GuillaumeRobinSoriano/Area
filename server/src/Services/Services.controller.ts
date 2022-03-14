import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ServicesService } from './Services.service';
import { Request } from 'express';
import jwt from 'jsonwebtoken'
import { Services } from 'src/Entity/services.entity';

const fs = require('fs');

export interface Color {
  r: string;
  g: string;
  b: string;
  o: string;
}
export interface widget {
  name: string;
  color: Color;
  description: string;
  assets: string;
}

@Controller('')
export class ServicesController {
  constructor(
    private readonly SService: ServicesService,
  ) {
  }
  
  @Get("/getActions")
  getActions(@Query('word') word: string[]): widget[] {
    const services = JSON.parse(fs.readFileSync('./src/Services/Services.json'));
    return (services.Actions.filter(item =>
      item.name.indexOf(word) === 0)
    )
  }
  @Get("/getReactions")
  getReaction(@Query('word') word: string[]): widget[] {
    const services = JSON.parse(fs.readFileSync('./src/Services/Services.json'));
    return (services.Reactions.filter(item =>
      item.name.indexOf(word) === 0)
    )
  }

  @Post("/setServices")
  setServices(
    @Body('action') action: string,
    @Body('actionParams') actionParams: string,
    @Body('reaction') reaction: string,
    @Body('reactionParams') reactionParams: string,
    @Body('trigger') trigger: string,
    @Body('triggerParams') triggerParams: string,
    @Req() request: Request
    ) : Services {
      const jwtoken = request.rawHeaders[request.rawHeaders.findIndex(item => item === 'jwt') + 1]
      const userInfo: any = jwt.verify(jwtoken, 'area')
      return this.SService.setServices(action, actionParams, reaction, reactionParams, trigger, triggerParams, userInfo.email);
    }

  @Get("/getServicesByMail")
  async getServices(
    @Req() request: Request
  ) : Promise<Services[]> {
    const jwtoken = request.rawHeaders[request.rawHeaders.findIndex(item => item === 'jwt') + 1]
    const userInfo: any = jwt.verify(jwtoken, 'area')
    return this.SService.findAllServicesByMail(userInfo.email);
  }

  @Delete("/deleteService")
  async deleteService(
    @Body('id') id: number,
    @Req() request: Request
  ) : Promise<Services> {
    const jwtoken = request.rawHeaders[request.rawHeaders.findIndex(item => item === 'jwt') + 1]
    const userInfo: any = jwt.verify(jwtoken, 'area')
    return this.SService.deleteService(id, userInfo.email);
  }

  @Delete("/deleteAllService")
  async deleteServices(
    @Req() request: Request
  ) : Promise<Services[]> {
    const jwtoken = request.rawHeaders[request.rawHeaders.findIndex(item => item === 'jwt') + 1]
    const userInfo: any = jwt.verify(jwtoken, 'area')
    return this.SService.deleteServices(userInfo.email);
  }
}