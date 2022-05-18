import request from "supertest";
import express from "express";
import App from "../../../../../src/core/presentation/app";
import Database from "../../../../../src/core/infra/data/connections/database";
import { UserEntity} from "../../../../../src/core/infra/data/database/entities/UserEntitie"
import UserRoutes  from "../../../../../src/features/users/presentation/routes/routes"
import { UserRepository } from "../../../../../src/features/users/infra/repositories/user.repository"

const makeUserDB = async (): Promise<UserEntity> => {
  return await UserEntity.create({
    name: "user1",
    password: "password1",
  }).save();
};

describe("POST /login", () => {

  const database = new Database();
  const server = new App().server;

  beforeAll(async () => {
    await database.openConnection();
    server.use(express.json());
    server.use(new UserRoutes().init());
  });

  afterAll(async () => {
    await UserEntity.delete({});
    await database.closeConnection();
  });

  test("Deve retornar 200 com o token do usuário", async () => {
    const user = await makeUserDB();

    await request(server)
      .post("/login")
      .send({ name: "user1", password: "password1"})
      .expect(200)
      .expect(async (res) => {
        expect(res.body.token).toBeTruthy();
      });
  });

  test("Deve retornar 400 com erro: Usuário não encontrado !", async () => {
    await request(server)
      .post("/login")
      .send({ name: "errado", password: "123456"})
      .expect(400), {
        error: "INVALID_DATA",
        message: "Usuário não encontrado !"
      }
  });

  test("Deve retornar 500 com Internal Server Error", async () => {
    jest
      .spyOn(UserRepository.prototype, "findByName")
      .mockRejectedValue(new Error("any_erro"));

    await request(server)
      .post("/login")
      .expect(500, {
      error: "INTERNAL_SERVER_ERROR",
      message: "any_erro",
    });
  });
  
});
