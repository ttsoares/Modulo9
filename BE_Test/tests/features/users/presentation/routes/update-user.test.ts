import request from "supertest";
import express from "express";
import App from "../../../../../src/core/presentation/app";
import Database from "../../../../../src/core/infra/data/connections/database";
import { UserEntity} from "../../../../../src/core/infra/data/database/entities/UserEntitie"
import UserRoutes  from "../../../../../src/features/users/presentation/routes/routes"
import { UserRepository } from "../../../../../src/features/users/infra/repositories/user.repository"
import { makeAdmToken } from "../../../../../src/core/presentation/helpers/helpers";

const makeUserDB = async (): Promise<UserEntity> => {
  return await UserEntity.create({
    name: "user1",
    password: "password1",
  }).save();
};

const admToken = makeAdmToken();

describe("PUT /user/userid", () => {

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

  test("Deve retornar 200 com o usuário atualizado", async () => {

    const user = await makeUserDB();
    //userID = user.uid;

    await request(server)
      .put(`/user/${user.uid}`)
      .send({
        name: "modificado",
        password: "654321"
      })
      .expect(200)
      .expect(async (res) => {
        expect(res.body.uid).toBeTruthy();
        expect(res.body.name).toBe("modificado");
        expect(res.body.password).toBe("654321");
      });
  });

  test("Deve retornar 400 com erro senha vazia", async () => {

    jest
      .spyOn(UserRepository.prototype, "findByName")
      .mockRejectedValue(new Error("any_error"));

    await request(server)
      .put(`/user/0567ab85-c606-4768-9214-1dbac4a4dd88`)
      .send({
        name: "qquer",
        password: ""
      })
      .expect(400), {
          error: "any_error",
          message: "Senha vazia !"
      };
  });

  test("Deve retornar 404 com erro: Usuário não encontrado !", async () => {
    await request(server)
      .put("/user/b696241d-78b5-4ab6-9f18-504d44f68cbd")
      .send({
        name: "qquer",
        password: "123456"
      })
      .expect(404), {
        error: "INVALID_DATA",
        message: "Usuário não encontrado !"
      }
  });

  test("Deve retornar 500 com Internal Server Error", async () => {
    jest
      .spyOn(UserRepository.prototype, "updateUser")
      .mockRejectedValue(new Error("any_erro"));

    await request(server)
      .put("/user/b696241d-78b5-4ab6-9f18-504d44f68cbd")
      .send({
        name: "qquer",
        password: "123456"
      })
      .expect(500, {
      error: "INTERNAL_SERVER_ERROR",
      message: "any_erro",
    });
  });

});
