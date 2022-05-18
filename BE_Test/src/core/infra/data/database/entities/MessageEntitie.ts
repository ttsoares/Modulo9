import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, JoinColumn, BeforeInsert, BeforeUpdate } from "typeorm";

import { v4 as uuid } from "uuid";
import { UserEntity } from "./UserEntitie"

@Entity({ name: "messages" })
export class MessageEntity extends BaseEntity {
  @PrimaryColumn()
    uid!: string;

  @Column()
    description: string;

  @Column()
    details: string;

  @Column()
    user_id: string;

  @Column({ name: "created_at" })
    createdAt!: Date;

  @Column({ name: "updated_at" })
    updatedAt!: Date;

  @ManyToOne(() => UserEntity, user => user.message)
  @JoinColumn({ name: "user_id", referencedColumnName: "uid" })
  user!: UserEntity;

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

  constructor( description: string, details: string, user_id: string ) {
    super();
    this.description = description;
    this.details = details;
    this.user_id = user_id;
  }
}
