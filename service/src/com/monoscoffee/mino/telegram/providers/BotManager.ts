import TelegramBot from "node-telegram-bot-api";
import { TelegramUser } from "../../entities/telegram/TelegramUser";
import bCrypt from "bcryptjs";

import { TelegramCodeBO } from "../../business/bo/telegramCodeBO";

export class BotManager {
  private api: TelegramBot = null;

  public register() {
    this.api = new TelegramBot(
      "1508796285:AAHoKKyxBA2Rj_mnWzA7CMgauB0ajks0Cyw",
      { polling: true }
    );
    console.log("[INFO] Telegram Bot registered!");
  }

  public createRegisterCode(user: TelegramUser) {
    return bCrypt.hashSync(String(user.id), 1);
  }

  public generateCode(user: TelegramUser, length: number) {
    let text = "";
    const possible = `ABCDEFGHIJKLMNOPQRSTUVWXYZ${user.id}`;

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  public registerEvents() {
    if (!this.api) {
      console.error(
        "[ERROR] Can't register events because telegram bot is not yet registered!"
      );
      throw new Error(
        "Can't register events because telegram bot is not yet registered!"
      );
    }
    console.log("[INFO] Telegram bot events now registered!");
    this.api.on("message", async (message) => {
      let user = message.from as TelegramUser;
      let args: string[] = message.text.split(" ");

      if (args.length > 0) {
        if (["/start", "/cadastrar"].find((item) => item == args[0])) {
          const telegramCodeBO = new TelegramCodeBO();

          const telegramCode = await telegramCodeBO.generateTelegramCode(
            user.id,
            "REGISTER"
          );

          this.api.sendMessage(
            user.id,
            `Olá ${user.first_name},\nEstou aqui para te ajudar com seu cadastro!\nSeu código de registro é:`
          );
          this.api.sendMessage(user.id, `${telegramCode.code}`);
        } else if (["/login", "/entrar"].find((item) => item == args[0])) {
          const telegramCodeBO = new TelegramCodeBO();

          const telegramCode = await telegramCodeBO.generateTelegramCode(
            user.id,
            "LOGIN"
          );

          this.api.sendMessage(
            user.id,
            `Olá ${user.first_name},\nQue bom ter você por aqui novamente!\nSeu código de login é:`
          );
          this.api.sendMessage(user.id, `${telegramCode.code}`);
          this.api.sendMessage(
            user.id,
            `Lembre-se que esse código é temporário e para realizar login novamente será necessário gerar outro código.`
          );
        } else {
          this.api.sendMessage(
            user.id,
            `Aww, me desculpe ${user.first_name}, mas não fui programada para reconhecer esse comando...`
          );
        }
      }
    });
  }
}
