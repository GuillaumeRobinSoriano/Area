import {
  Controller,
  Post,
  Body,
  Get,
  Header,
  Param,
  Patch,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { Users } from 'src/Entity/users.entity';
import { UsersService } from './users.service';
import jwt from 'jsonwebtoken'
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(): Promise<Users[]> {
    return this.userService.findAll();
  }

  @Post()
  @Header('content-type', 'application/json')
  addUser(
    @Body('email') userEmail: string,
    @Body('name') userName: string,
    @Body('password') userPasword: string,
  ) {
    return this.userService.create(
      userEmail,
      userName,
      userPasword,
    );
  }

  @Patch('setName')
  @Header('content-type', 'application/json')
  async setName(
    @Body('name') name: string,
    @Req() request: Request
  ) : Promise<Users> {
    const jwtoken = request.rawHeaders[request.rawHeaders.findIndex(item => item === 'jwt') + 1]
    const userInfo: any = jwt.verify(jwtoken, 'area')
    return this.userService.setName(userInfo.email, name);
  }

  @Patch('setDescription')
  @Header('content-type', 'application/json')
  async setDescription(
    @Body('description') description: string,
    @Req() request: Request
  ) : Promise<Users> {
    const jwtoken = request.rawHeaders[request.rawHeaders.findIndex(item => item === 'jwt') + 1]
    const userInfo: any = jwt.verify(jwtoken, 'area')
    return this.userService.setDescription(userInfo.email, description);
  }

  @Patch('setBanner')
  @Header('content-type', 'application/json')
  async setBanner(
    @Body('banner') banner: string,
    @Req() request: Request
  ) : Promise<Users> {
    const jwtoken = request.rawHeaders[request.rawHeaders.findIndex(item => item === 'jwt') + 1]
    const userInfo: any = jwt.verify(jwtoken, 'area')
    return this.userService.setBanner(userInfo.email, banner);
  }

  @Patch('setPicture')
  @Header('content-type', 'application/json')
  async setPicture(
    @Body('picture') picture: string,
    @Req() request: Request
  ) : Promise<Users> {
    const jwtoken = request.rawHeaders[request.rawHeaders.findIndex(item => item === 'jwt') + 1]
    const userInfo: any = jwt.verify(jwtoken, 'area')
    return this.userService.setPicture(userInfo.email, picture);
  }

  @Get('/userInfo')
  async getUserInfo(
    @Req() request: Request
  ): Promise<Users> {
    const jwtoken = request.rawHeaders[request.rawHeaders.findIndex(item => item === 'jwt') + 1]
    const userInfo: any = jwt.verify(jwtoken, 'area')
    return await this.userService.getUserInfo(userInfo.email);
  }

  @Get(':id')
  getUser(@Param('id') userId: string) {
    const userFound = this.userService.findOne(userId);
    return userFound
  }

  @Get('email/:email')
  getUserByUsername(@Param('email') userEmail: string) {
    const userFound = this.userService.findOneByEmail(userEmail);
    return userFound
  }

  @Patch('/setNotification')
  @Header('content-type', 'application/json')
  setNotification(
    @Body('email') email: string,
    @Body('notification') notification: string,
  ) {
    this.userService.setNotification(email, notification);
    return "Notification set";
  }

  @Patch(':id')
  @Header('content-type', 'application/json')
  updateUser(
    @Param('id') userId: number,
    @Body('email') userEmail: string,
    @Body('name') userName: string,
    @Body('password') userPasword: string,
  ) {
    this.userService.updateUser(userId, userEmail, userName, userPasword);
    return null;
  }

  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    this.userService.remove(userId);
    return "User deleted";
  }

}
