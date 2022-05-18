import request from "supertest";
import express from "express";
import App from "../../../../../src/core/presentation/app";
import Database from "../../../../../src/core/infra/data/connections/database";
import MessageRoutes from "../../../../../src/features/messages/presentation/routes/routes";
import { MessageEntity } from "../../../../../src/core/infra/data/database/entities/MessageEntitie";
import { UserEntity} from "../../../../../src/core/infra/data/database/entities/UserEntitie"
import jwt from 'jsonwebtoken'; 
import 'dotenv/config';

const makeUserDB = async (): Promise<UserEntity> => {
  return await UserEntity.create({
    name: "user1",
    password: "senha1",
  }).save();
};

// Can be a Synchronous opperation ?
const makeToken = (user: UserEntity): string => {
  return jwt.sign(
    {id:user.uid, name: user.name},
    process.env.JWT_SECRET!,
    {expiresIn: '1m'}
  )
}

describe("POST /message", () => {

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

  it("Deve retornar 200 com uma mensagem criada com todas as informações", async () => {

    const user = await makeUserDB();
    const token = makeToken(user);
  
    await request(server)
      .post(`/message/${user.uid}`)
      .send({description: "Uma descricao", details: "Algum detalhamento"})
      .set('Authorization', token) 
      .expect(200)
      .expect(async (res) => {
        expect(res.body.uid).toBeTruthy();
        expect(res.body.description).toBe("Uma descricao");
        expect(res.body.details).toBe("Algum detalhamento");
      });
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

});
