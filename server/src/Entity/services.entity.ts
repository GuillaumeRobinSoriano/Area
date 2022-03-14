import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Services {
  constructor( 
    action: string,
    actionparams: string,
    reaction: string,
    reactionparams: string,
    trigger: string,
    triggerparams: string,
    owner: string
  ) {
    this.action = action,
    this.actionparams = actionparams,
    this.reaction = reaction,
    this.reactionparams = reactionparams,
    this.trigger = trigger,
    this.triggerparams = triggerparams,
    this.owner = owner
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string;

  @Column()
  actionparams: string;

  @Column()
  reaction: string;

  @Column()
  reactionparams: string;

  @Column()
  trigger: string;

  @Column()
  triggerparams: string;

  @Column()
  owner: string;
}
