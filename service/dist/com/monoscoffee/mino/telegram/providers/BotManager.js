"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotManager = void 0;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const telegramCodeBO_1 = require("../../business/bo/telegramCodeBO");
class BotManager {
    constructor() {
        this.api = null;
    }
    register() {
        this.api = new node_telegram_bot_api_1.default("1508796285:AAHoKKyxBA2Rj_mnWzA7CMgauB0ajks0Cyw", { polling: true });
        console.log("[INFO] Telegram Bot registered!");
    }
    createRegisterCode(user) {
        return bcryptjs_1.default.hashSync(String(user.id), 1);
    }
    generateCode(user, length) {
        let text = "";
        const possible = `ABCDEFGHIJKLMNOPQRSTUVWXYZ${user.id}`;
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
    registerEvents() {
        if (!this.api) {
            console.error("[ERROR] Can't register events because telegram bot is not yet registered!");
            throw new Error("Can't register events because telegram bot is not yet registered!");
        }
        console.log("[INFO] Telegram bot events now registered!");
        this.api.on("message", (message) => __awaiter(this, void 0, void 0, function* () {
            let user = message.from;
            let args = message.text.split(" ");
            if (args.length > 0) {
                if (["/start", "/cadastrar"].find((item) => item == args[0])) {
                    const telegramCodeBO = new telegramCodeBO_1.TelegramCodeBO();
                    const telegramCode = yield telegramCodeBO.generateTelegramCode(user.id, "REGISTER");
                    this.api.sendMessage(user.id, `Olá ${user.first_name},\nEstou aqui para te ajudar com seu cadastro!\nSeu código de registro é:`);
                    this.api.sendMessage(user.id, `${telegramCode.code}`);
                }
                else if (["/login", "/entrar"].find((item) => item == args[0])) {
                    const telegramCodeBO = new telegramCodeBO_1.TelegramCodeBO();
                    const telegramCode = yield telegramCodeBO.generateTelegramCode(user.id, "LOGIN");
                    this.api.sendMessage(user.id, `Olá ${user.first_name},\nQue bom ter você por aqui novamente!\nSeu código de login é:`);
                    this.api.sendMessage(user.id, `${telegramCode.code}`);
                    this.api.sendMessage(user.id, `Lembre-se que esse código é temporário e para realizar login novamente será necessário gerar outro código.`);
                }
                else {
                    this.api.sendMessage(user.id, `Aww, me desculpe ${user.first_name}, mas não fui programada para reconhecer esse comando...`);
                }
            }
        }));
    }
}
exports.BotManager = BotManager;
//# sourceMappingURL=BotManager.js.map