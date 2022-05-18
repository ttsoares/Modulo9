import App from "./core/presentation/app";
import Database from "./core/infra/data/connections/database";
import 'dotenv/config'
import "reflect-metadata";

new Database().openConnection()
  .then(() => {
    const app = new App();
    app.init();
    app.start(process.env.PORT || "8888");
  })
  .catch((err) => {
    console.log(err);
  });
