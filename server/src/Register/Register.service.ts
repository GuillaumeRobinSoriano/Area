import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/Entity/users.entity';
import { Repository } from 'typeorm';
import jwt from 'jsonwebtoken'
const nodemailer = require('nodemailer');

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

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

  async register(
    email: string,
    name: string,
    password: string,
  ): Promise<string> {
    if (!email || !name || !password)
      throw new BadRequestException('Bad data');

    const check_user = await this.findOneByEmail(email);
    if (check_user) {
      throw new NotFoundException('user already exist');
    }
    const data = '';
    
    const user = this.usersRepository.create({
      email,
      password,
      name,
      data
    });
    this.usersRepository.save(user);

    const sender = 'pikasBot@gmail.com';
    const senderPassword = 'yhcopphcjxaqodzk';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: sender,
        pass: senderPassword,
      },
    });

    const mailOptions = {
      from: sender,
      to: email,
      subject: `WELCOME TO THE BEST AREA IN THE WORLD`,
      text: `Hello ${name}, welcome to the best area in the world.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    return await jwt.sign({ email: email }, 'area');
  }
}
