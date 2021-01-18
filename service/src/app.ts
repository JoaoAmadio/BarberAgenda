import express from "express";
import { Connection, createConnection } from "typeorm";
import cors from "cors";
import routes from "./com/monoscoffee/mino/routes";
import { BotManager } from "./com/monoscoffee/mino/telegram/providers/BotManager";
import User from "./com/monoscoffee/mino/entities/user";
import Person from "./com/monoscoffee/mino/entities/person";
import TelegramCode from "./com/monoscoffee/mino/entities/telegram/TelegramCodes";

const port = process.env.PORT || 8080;

function startApp(connection: Connection) {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(routes);

  app.listen(port, () =>
    console.log(`server running on http://localhost:${port}`)
  );

  const telegramBotManager = new BotManager();
  telegramBotManager.register();
  telegramBotManager.registerEvents();
}

createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "barberagenda",
  entities: [User, Person, TelegramCode],
  synchronize: true,
  logging: false,
}).then(startApp);
