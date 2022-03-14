import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/Entity/users.entity';
import { Repository } from 'typeorm';

// let nodemailer = require('nodemailer');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<Users> {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException('Could not find the user.');
    return user;
  }

  async findOneByEmail(email: string): Promise<Users> {
    const user = await this.usersRepository.find({ email: email });
    if (!user)
      throw new NotFoundException('Could not find the user by username.');
    return user[0];
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(email: string, name: string, password: string): Promise<Users> {
    if (!email || !name || !password) throw new BadRequestException('Bad data');
    const check_user = await (this.findOneByEmail(email));
    if (check_user) {
      throw new NotFoundException('user already exist');
    }
    const data = "";
    const user = this.usersRepository.create({
      email,
      password,
      name,
      data
    });
    await this.usersRepository.save(user);

    return user;
  }

  async updateUser(
    id: number,
    email: string,
    name: string,
    password: string
  ): Promise<Users> {
    const user = await this.usersRepository.findOne(id);
    if (email) user.email = email;
    if (name) user.name = name;
    if (email) user.email = email;
    user.data = '';

    this.usersRepository.update(id, user);
    return user;
  }

  async findUserData(id: number): Promise<any> {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException('Could not find the user.');
    return user.data;
  }

  async patchUserData(id: number, data: string): Promise<any> {
    const property = await this.usersRepository.findOne({
      where: { id },
    });
    const newUser = new Users(
      property.email,
      property.password,
      property.name,
      data,
      "",
      "",
      "",
      ""
    );
    return this.usersRepository.update(
      {id: id},
      newUser,
    );
  }

  async deleteUserData(id: number): Promise<any> {
    const property = await this.usersRepository.findOne({
      where: { id },
    });
    const newUser = new Users(
      property.email,
      property.password,
      property.name,
      "",
      "",
      "",
      "",
      ""
    );
    return this.usersRepository.update(
      {id: id},
      newUser,
    );
  }

  async getUserInfo(userEmail: string): Promise<Users> {
    const user = await this.usersRepository.find({ email: userEmail });
    if (!user) throw new NotFoundException('Could not find the user.');
    return user[0];
  }

  async setName(userEmail: string, name: string): Promise<any> {
    const user = await this.getUserInfo(userEmail);
    const newUser = {...user, name: name};
    this.usersRepository.update(
      {id: user.id},
      newUser,
    );
    return newUser;
  }


  async setDescription(userEmail: string, description: string): Promise<any> {
    const user = await this.getUserInfo(userEmail);
    const newUser = {...user, description: description};
    this.usersRepository.update(
      {id: user.id},
      newUser,
    );
    return newUser;
  }

  async setBanner(userEmail: string, banner: string): Promise<any> {
    const user = await this.getUserInfo(userEmail);
    const newUser = {...user, banner: banner};
    this.usersRepository.update(
      {id: user.id},
      newUser,
    );
    return newUser;
  }

  async setPicture(userEmail: string, picture: string): Promise<any> {
    const user = await this.getUserInfo(userEmail);
    const newUser = {...user, picture: picture};
    this.usersRepository.update(
      {id: user.id},
      newUser,
    );
    return newUser;
  }

  async setNotification(userEmail: string, notification: string): Promise<any> {
    console.log("testtttt")
    const user = await this.getUserInfo(userEmail);
    let newNotification = user.notification;
    if (notification === null) {
      newNotification = notification;
    } else {
      newNotification = newNotification + "," + notification;
    }
    const newUser = {...user, notification: newNotification};
    this.usersRepository.update(
      {id: user.id},
      newUser,
    );
    return newUser;
  }
}
