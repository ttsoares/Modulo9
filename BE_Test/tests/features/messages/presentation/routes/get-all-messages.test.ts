import request from "supertest";
import express from "express";
import App from "../../../../../src/core/presentation/app";
import Database from "../../../../../src/core/infra/data/connections/database";
import MessageRoutes from "../../../../../src/features/messages/presentation/routes/routes";
import { MessageEntity } from "../../../../../src/core/infra/data/database/entities/MessageEntitie";
import { MessageRepository } from "../../../../../src/features/messages/infra/repositories/messages.repository"
import { v4 as uuid } from "uuid";
import { UserEntity} from "../../../../../src/core/infra/data/database/entities/UserEntitie"
import jwt from 'jsonwebtoken'; 
import 'dotenv/config';

const makeUserDB = async (): Promise<UserEntity> => {
  return await UserEntity.create({
    name: "user1",
    password: "senha1",
  }).save();
};

const makeToken = (user: UserEntity): string => {
  return jwt.sign(
    {id:user.uid, name: user.name},
    process.env.JWT_SECRET!,
    {expiresIn: '1m'}
  )
}

describe("GET /messages", () => {
  const database = new Database();
  const server = new App().server;

  beforeEach(async () => {
    await MessageEntity.clear();
    await UserEntity.delete({});
  });

  afterEach(async () => {
    await MessageEntity.clear();
    await UserEntity.delete({});
  })

  beforeAll(async () => {
    await database.openConnection();
    server.use(express.json());
    server.use(new MessageRoutes().init());
  });

  afterAll(async () => {
    await database.closeConnection();
    jest.setTimeout(5000);
  });

  it("Deve retornar 200, do PGSQL, ao buscar uma lista com 2 mensagens", async () => {

    const user = await makeUserDB();
    const token = makeToken(user);

    const message1 = await MessageEntity.create({
      description: "Descricao 1",
      details: "Detalhes 1",
      user_id: user.uid
    }).save();

    const message2 = await MessageEntity.create({
      description: "Descricao 2",
      details: "Detalhes 2",
      user_id: user.uid
    }).save();

    await request(server)
    .get(`/messages/${user.uid}`)
    .send()
    .set('Authorization', token) 
    .expect(200)
    .expect(async (res) => {
      expect(res.body).toHaveLength(2);
      expect(res.body[0]).toEqual({
        uid: message1.uid,
        description: message1.description,
        details: message1.details,
        user_id: message1.user_id
      });
      expect(res.body[1]).toEqual({
        uid: message2.uid,
        description: message2.description,
        details: message2.details,
        user_id: message2.user_id
      });
    });
  });

  it("Deve retornar 404 com a mensagem Data not found", async () => {
    const user = await makeUserDB();
    const token = makeToken(user);
    
    await request(server)
    .get(`/message/${uuid()}`)
    .send()
    .set('Authorization', token) 
    .expect(404, { error: "Mensagem não encontrada !" });
  });

  it("Deve retornar 409 com mensagem 'Nao autorizado' por não enviar token", async () => {
    const user = await makeUserDB();
  
    await request(server)
      .post(`/message/${user.uid}`)
      .send({description: "Uma descricao", details: "Algum detalhamento"})
      .expect(409)
      .expect(async (res) => {
        expect(res.body.message).toBe("Token Invalido")
        console.log(res.body.message)
      });
  });

  it("Deve retornar 500 com Internal Server Error", async () => {
    jest
      .spyOn(MessageRepository.prototype, "update")
      .mockRejectedValue(new Error("any_erro"));

    const user = await makeUserDB();
    const token = makeToken(user);
    await request(server)
      .put("/message/b696241d-78b5-4ab6-9f18-504d44f68cbd")
      .send({
        description: "Descrcao...",
        details: "Detalhes...."
      })
      .set('Authorization', token)
      .expect(500, {
      error: "INTERNAL_SERVER_ERROR",
      message: "any_erro",
    });
  });

});