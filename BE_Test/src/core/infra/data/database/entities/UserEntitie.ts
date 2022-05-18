import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, BeforeInsert, BeforeUpdate } from "typeorm";

import { v4 as uuid } from "uuid";
import { MessageEntity } from "./MessageEntitie";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
    uid!: string;

  @Column()
    name!: string;

  @Column()
    password!: string;

  @Column({ name: "created_at" })
    createdAt!: Date;

  @Column({ name: "updated_at" })
    updatedAt!: Date;

// Usar como mostra abaixo também _não_ resolve o problema
// de nao conseguir remover usuários com mensagens no heroku

@OneToMany(() => MessageEntity, message => message.user, {onDelete: "CASCADE"}) 
message!: MessageEntity[];

//@OneToMany(() => MessageEntity, message => message.user, {cascade: true}) 
//message!: MessageEntity[];

  @BeforeInsert()
  private beforeInsert(){
    this.uid = uuid();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  private beforeUpdate() {
    this.updatedAt = new Date();
  }

  constructor( name: string, password: string ) {
    super();
    this.name = name;
    this.password = password;
  }
}
