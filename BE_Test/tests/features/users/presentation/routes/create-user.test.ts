import request from "supertest";
import express from "express";
import App from "../../../../../src/core/presentation/app";
import Database from "../../../../../src/core/infra/data/connections/database";
import { UserEntity} from "../../../../../src/core/infra/data/database/entities/UserEntitie"
import UserRoutes  from "../../../../../src/features/users/presentation/routes/routes"
import { UserRepository } from "../../../../../src/features/users/infra/repositories/user.repository"

describe("POST /user/store", () => {

  const makeUserDB = async (): Promise<UserEntity> => {
    return await UserEntity.create({
      name: "user1",
      password: "senha1",
    }).save();
  };

  const database = new Database();
  const server = new App().server;

  beforeAll(async () => {
    await database.openConnection();
    server.use(express.json());
    server.use(new UserRoutes().init());
  });

  beforeEach(async () => {
    await UserEntity.delete({});
  });
  
  afterEach(async () => {
    await UserEntity.delete({});
  });

  afterAll(async () => {
    await database.closeConnection();
    jest.setTimeout(5000);
  });

  it("Deve retornar 200 com uma mensagem criada com todas as informações", async () => {
    await request(server)
      .post("/user/store")
      .send({ name: "user1", password: "password1"})
      .expect(200)
      .expect(async (res) => {
        expect(res.body.uid).toBeTruthy();
        expect(res.body.name).toBe("user1");
        expect(res.body.password).toBe("password1");
      });
  });

  it("Deve retornar 400 com erro: Usuário já existe !", async () => {
    await makeUserDB();

    await request(server)
      .post("/user/store")
      .send({ name: "user1", password: "password1"})
      .expect(400), {
        error: "INVALID_DATA",
        message: "Usuário já existe !"
      }
  });

  it("Deve retornar 500 com Internal Server Error", async () => {
    jest
      .spyOn(UserRepository.prototype, "createUser")
      .mockRejectedValue(new Error("any_erro"));

    await request(server).post("/user/store").send().expect(500, {
      error: "INTERNAL_SERVER_ERROR",
      message: "any_erro",
    });
  });

});
