import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DefaultModule } from './Default/Default.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { SearchActionModule } from './SearchAction/SearchAction.module';
import { LoginModule } from './Login/Login.module';
import { RegisterModule } from './Register/Register.module';
import { ServicesModule } from './Services/Services.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { JwtMiddleware } from './utils/jwt.middleware';
import { Users } from './Entity/users.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { sendNotifsModule } from './sendNotifs/sendNotifs.module';
import { PingModule } from './Ping/Ping.module';
import { AboutModule } from './About/About.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Users]),
    LoginModule,
    RegisterModule,
    SearchActionModule,
    ServicesModule,
    UsersModule,
    sendNotifsModule,
    PingModule,
    AboutModule,
    DefaultModule
  ],
})
export class AppModule implements NestModule {
  constructor(private connection: Connection) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware).forRoutes('*');
    consumer
      .apply(JwtMiddleware)
      .exclude(
        'login',
        'register',
        'users(.*)',
        'ping',
        'about.json'
      )
      .forRoutes('*');
  }
}
