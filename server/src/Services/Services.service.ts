import {
  Injectable, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Services } from '../Entity/services.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Services)
    private usersServices: Repository<Services>
  ) {}

  setServices(action: string, actionParams: string, reaction: string, reactionParams: string,trigger: string,triggerParams: string, owner: string): Services {
    const newService = this.usersServices.create({
      action: action, 
      actionparams: actionParams, 
      reaction: reaction, 
      reactionparams: reactionParams, 
      trigger: trigger, 
      triggerparams: triggerParams, 
      owner: owner
    })
    this.usersServices.save(newService)
    return newService
  }

  async findAllServicesByMail(user: string) : Promise<Services[]> {
    const services = await this.usersServices.find({ owner: user });
    if (!services)
      throw new NotFoundException('Could not find any services for this owner.');
    return services;
  }

  async deleteService(id: number, user: string) : Promise<Services> {
    const service = await this.usersServices.findOne({ id: id, owner: user });
    if (!service)
      throw new NotFoundException('Could not find any service from this owner with this ID.');
    this.usersServices.delete(id)
    return service;
  }

  async deleteServices(user: string) : Promise<Services[]> {
    const service = await this.usersServices.find({ owner: user })
    if (!service)
      throw new NotFoundException('Could not find any service from this owner.');
    for(let i = 0; i < service.length; i++) {
      this.usersServices.delete(service[i].id)
    }
    return service;
  }

}