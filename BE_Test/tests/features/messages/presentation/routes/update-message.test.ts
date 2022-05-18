import request from "supertest";
import express from "express";
import App from "../../../../../src/core/presentation/app";
import Database from "../../../../../src/core/infra/data/connections/database";
import MessageRoutes from "../../../../../src/features/messages/presentation/routes/routes";
import { MessageEntity } from "../../../../../src/core/infra/data/database/entities/MessageEntitie";
import { UserEntity} from "../../../../../src/core/infra/data/database/entities/UserEntitie"
import { v4 as uuid } from "uuid";
import jwt from 'jsonwebtoken'; 
import 'dotenv/config';

const makeUserDB = async (): Promise<UserEntity> => {
  return await UserEntity.create({
    name: "user1",
    password: "password1",
  }).save();
};

const makeMessageDB = async (userid: string): Promise<MessageEntity> => {
  return await MessageEntity.create({
    description: "Mensagem teste edicao",
    details: "Teste Teste Teste Teste Teste Teste",
    user_id: userid
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

describe("PUT /message/uid", () => {

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

  test("Deve retornar 200, do PGSQL, após modificar a mensangem", async () => {
    const user = await makeUserDB();
    const message = await makeMessageDB(user.uid);
    const token = makeToken(user);

    await request(server)
    .put(`/message/${message.uid}`)
    .send({
      description: "descricao modificada",
      details: "detalhes modificados" })
    .set('Authorization', token) 
    .expect(200)
    .expect(async (res) => {
      expect(res.body.uid).toBe(message.uid);
        expect(res.body.description).toBe("descricao modificada");
        expect(res.body.details).toBe("detalhes modificados");
    });
  });

  test("Deve retornar 404 com a mensagem Data not found", async () => {
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

});
