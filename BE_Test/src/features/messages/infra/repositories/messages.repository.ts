import { MessageEntity } from
"../../../../core/infra/data/database/entities/MessageEntitie";
import { UserEntity } from
"../../../../core/infra/data/database/entities/UserEntitie";

import { Message } from "../../domain/models/message";

interface CreateMessageParams {
  description: string;
  details: string;
  user_id: string;
}

interface UpdateMessageParams{
  uid: string,
  description: string;
  details: string;
}

export class MessageRepository {
//******************************

  ///// Cria uma nova mensagem no DB
  async createMessage( data: CreateMessageParams, ): Promise<Message | undefined> {

    const newMessage = MessageEntity.create({
      description: data.description,
      details: data.details,
      user_id: data.user_id,
    });

    await newMessage.save();

    return this.mapperFromEntityToModel(newMessage);
  }

  /////  Busca um array com todas as mensagens de um usuário
  async getAll(user_id: string): Promise<Message[]> {
    const allMessages = await MessageEntity.find({where: {user_id} });

    return allMessages.map(elm => this.mapperFromEntityToModel(elm))
  }

  /////   Apaga uma mensagem pelo 'uid'
  async delete(uid: string): Promise<Message | undefined> {

    const oneMessage = await MessageEntity.findOne(uid);

    if (!oneMessage) return undefined;

    await oneMessage.remove()

    return this.mapperFromEntityToModel(oneMessage);
  }

  /////  Busca uma mensagem pelo 'uid'
  async getByUid(uid: string): Promise<Message | undefined> {
    const oneMessage = await MessageEntity.findOne(uid, {
      select: ["description", "details", "uid", "user_id"]});

    if (!oneMessage) return undefined;
    return this.mapperFromEntityToModel(oneMessage);
  }

  /////  Atualiza o resgistro de uma mensagem buscada pelo getByUid
  async update( data: UpdateMessageParams, ): Promise<Message | undefined> {

    const oneMessage: MessageEntity | undefined = await MessageEntity.findOne({
			where: {uid: data.uid} });

    if (!oneMessage) return undefined;

    oneMessage.description = data.description;
    oneMessage.details = data.details

    await oneMessage.save();

    return this.mapperFromEntityToModel(oneMessage);
  }

  /////  função que transforma de 'entity' para 'model'
  private mapperFromEntityToModel(entity: MessageEntity): Message {
    return {
      uid: entity.uid,
      description: entity.description,
      details: entity.details,
      user_id: entity.user_id,
    };
  }
}
