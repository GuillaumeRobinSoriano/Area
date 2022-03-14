import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  constructor(email: string, password: string, name: string, data: string, description: string, picture: string, banner: string, notification: string) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.data = data;
    this.description = description;
    this.picture = picture;
    this.banner = banner;
    this.notification = notification;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  data: string;

  @Column()
  description: string;

  @Column()
  picture: string;

  @Column()
  banner: string;

  @Column()
  notification: string;
}
