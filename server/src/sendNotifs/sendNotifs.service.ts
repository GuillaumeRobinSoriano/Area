import {
  Injectable,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Services } from 'src/Entity/services.entity';
import { Repository } from 'typeorm';
import { checkAction } from './Action';
import { checkTrigger } from './Trigger';
import { checkReaction } from './Reaction';

@Injectable()
export class sendNotifsService {
  constructor(
    @InjectRepository(Services)
    private usersServices: Repository<Services>
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async sendNotification(): Promise<void> {
    const services = await this.usersServices.find()
    services.forEach(async (service) => {
      const action: number = await checkAction(service);
      const trigger: boolean = await checkTrigger(service, action);
      if (trigger) {
        await checkReaction(service, action);
      }
    })

    console.log("services :", services)
  }
}
