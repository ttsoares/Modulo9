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

describe("DELETE /user/userid", () => {

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

  it("Deve retornar 200 com o usuario removido", async () => {
    const user = await makeUserDB();

    await request(server)
      .delete(`/user/${user.uid}`)
      .send()
      .set('Authorization', admToken) 
      .expect(200)
      .expect(async (res) => {
        expect(res.body.uid).toBeTruthy();
        expect(res.body.name).toBe("user1");
        expect(res.body.password).toBe("password1");
      });
  });

  it("Deve retornar 400 com erro: Usuário não encontrado !", async () => {
    await request(server)
      .delete("/user/b696241d-78b5-4ab6-9f18-504d44f68cbd")
      .send()
      .set('Authorization', admToken)
      .expect(400), {
        error: "INVALID_DATA",
        message: "Usuário não encontrado !"
      }
  });

  it("Deve retornar 500 com Internal Server Error", async () => {
    jest
      .spyOn(UserRepository.prototype, "deleteUser")
      .mockRejectedValue(new Error("any_erro"));

    await request(server)
      .delete("/user/b696241d-78b5-4ab6-9f18-504d44f68cbd")
      .send()
      .set('Authorization', admToken) 
      .expect(500, {
      error: "INTERNAL_SERVER_ERROR",
      message: "any_erro",
    });
  });
  
});
