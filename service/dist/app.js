"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./com/monoscoffee/mino/routes"));
const BotManager_1 = require("./com/monoscoffee/mino/telegram/providers/BotManager");
const user_1 = __importDefault(require("./com/monoscoffee/mino/entities/user"));
const person_1 = __importDefault(require("./com/monoscoffee/mino/entities/person"));
const TelegramCodes_1 = __importDefault(require("./com/monoscoffee/mino/entities/telegram/TelegramCodes"));
const port = process.env.PORT || 8080;
function startApp(connection) {
    const app = express_1.default();
    app.use(express_1.default.json());
    app.use(cors_1.default());
    app.use(routes_1.default);
    app.listen(port, () => console.log(`server running on http://localhost:${port}`));
    const telegramBotManager = new BotManager_1.BotManager();
    telegramBotManager.register();
    telegramBotManager.registerEvents();
}
typeorm_1.createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "barberagenda",
    entities: [user_1.default, person_1.default, TelegramCodes_1.default],
    synchronize: true,
    logging: false,
}).then(startApp);
//# sourceMappingURL=app.js.map