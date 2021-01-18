import { DefaultDAO } from "../core/dao/defaultDAO";
import { getRepository, In } from "typeorm";
import TelegramCode from "../../entities/telegram/TelegramCodes";

export class TelegramCodeBO extends DefaultDAO {
  constructor() {
    super();
  }

  public async checkAutenticy(
    ref: number,
    code: string
  ): Promise<boolean | null> {
    const telegramCodeRepository = getRepository(TelegramCode);

    let telegramCode: TelegramCode = null;
    try {
      telegramCode = await telegramCodeRepository.findOneOrFail({
        where: { ref, code },
      });
    } catch (error) {
      return null;
    }
    return !!telegramCode;
  }

  public async findCodeByRefAndCodeAndType(
    ref: number,
    code: string,
    type: "LOGIN" | "REGISTER"
  ): Promise<TelegramCode | null> {
    const telegramCodeRepository = getRepository(TelegramCode);

    let telegramCode: TelegramCode = null;
    try {
      telegramCode = await telegramCodeRepository.findOneOrFail({
        where: { ref, code, type },
      });
    } catch (error) {
      return null;
    }
    return telegramCode;
  }
  public async findCodeByCodeAndType(
    code: string,
    type: "LOGIN" | "REGISTER"
  ): Promise<TelegramCode | null> {
    const telegramCodeRepository = getRepository(TelegramCode);

    let telegramCode: TelegramCode = null;
    try {
      telegramCode = await telegramCodeRepository.findOneOrFail({
        where: { code, type },
      });
    } catch (error) {
      return null;
    }
    return telegramCode;
  }

  public generateCode(id: number, length: number) {
    let text = "";
    const possible = `ABCDEFGHIJKLMNOPQRSTUVWXYZ${id}`;

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  public async generateTelegramCode(
    ref: number,
    type: "LOGIN" | "REGISTER"
  ): Promise<TelegramCode | null> {
    const telegramCodeRepository = getRepository(TelegramCode);

    const code = this.generateCode(ref, 6);

    let telegramCode: TelegramCode = await telegramCodeRepository.findOne({
      where: { ref, type },
    });

    if (telegramCode) {
      return telegramCode;
    }

    telegramCode = new TelegramCode();
    telegramCode.code = code;
    telegramCode.createdAt = new Date();
    telegramCode.expired = false;
    telegramCode.ref = ref;
    telegramCode.type = type;

    telegramCode = await telegramCodeRepository.save(telegramCode);

    return telegramCode;
  }

  public async deleteTelegramCode(
    ref: number,
    code: string
  ): Promise<boolean | null> {
    let telegramCodeRepository = getRepository(TelegramCode);

    let telegramCode: TelegramCode = null;
    try {
      telegramCode = await telegramCodeRepository.findOneOrFail({
        where: { ref, code },
      });

      if (telegramCode) {
        await telegramCodeRepository.remove(telegramCode);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}
