import request from "supertest";
import express from "express";
import App from "../../../../../src/core/presentation/app";
import Database from "../../../../../src/core/infra/data/connections/database";
import { UserEntity} from "../../../../../src/core/infra/data/database/entities/UserEntitie"
import UserRoutes  from "../../../../../src/features/users/presentation/routes/routes"
import { UserRepository } from "../../../../../src/features/users/infra/repositories/user.repository"
import { makeAdmToken } from "../../../../../src/core/presentation/helpers/helpers";

const makeUserDB = async (name: string, password: string): Promise<UserEntity> => {
  return await UserEntity.create({
    name: name,
    password: password,
  }).save();
};

const admToken = makeAdmToken();

describe("GET /users", () => {
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

  //Each test stats with an empty DB
  test("Deve retornar 404 com erro: Nenhum usuário.", async () => {
    await request(server)
      .get("/users")
      //.set('Authorization', `Bearer ${token}`);
      .set({Headers: {'Authorization': admToken}})
      .expect(404), {
        error: "DATA_NOT_FOUND",
        message: "Nenhum usuário."
      }
  });

  test("Deve retornar 200 com a lista de usuários", async () => {

    const user1 = await makeUserDB("user1", "password1");
    const user2 = await makeUserDB("user2", "password2");

    await request(server)
      .get("/users")
      .send()
      .set({Headers: {'Authorization': admToken}})
      .expect(200)
      .expect(async (res) => {
        expect(res.body).toHaveLength(2);
        expect(res.body[0]).toEqual({
          uid: user1.uid,
          name: user1.name,
          password: user1.password
        });
        expect(res.body[1]).toEqual({
          uid: user2.uid,
          name: user2.name,
          password: user2.password
        });
      });
  });

  test("Deve retornar 500 com Internal Server Error", async () => {
    jest
      .spyOn(UserRepository.prototype, "getAllUsers")
      .mockRejectedValue(new Error("No default engine was specified and no extension was provided."));

    await request(server)
      .get("/users")
      .expect(500, {
      error: "INTERNAL_SERVER_ERROR",
      message: "No default engine was specified and no extension was provided.",
    });
  });

});
