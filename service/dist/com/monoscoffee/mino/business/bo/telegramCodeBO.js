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
exports.TelegramCodeBO = void 0;
const defaultDAO_1 = require("../core/dao/defaultDAO");
const typeorm_1 = require("typeorm");
const TelegramCodes_1 = __importDefault(require("../../entities/telegram/TelegramCodes"));
class TelegramCodeBO extends defaultDAO_1.DefaultDAO {
    constructor() {
        super();
    }
    checkAutenticy(ref, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const telegramCodeRepository = typeorm_1.getRepository(TelegramCodes_1.default);
            let telegramCode = null;
            try {
                telegramCode = yield telegramCodeRepository.findOneOrFail({
                    where: { ref, code },
                });
            }
            catch (error) {
                return null;
            }
            return !!telegramCode;
        });
    }
    findCodeByRefAndCodeAndType(ref, code, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const telegramCodeRepository = typeorm_1.getRepository(TelegramCodes_1.default);
            let telegramCode = null;
            try {
                telegramCode = yield telegramCodeRepository.findOneOrFail({
                    where: { ref, code, type },
                });
            }
            catch (error) {
                return null;
            }
            return telegramCode;
        });
    }
    findCodeByCodeAndType(code, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const telegramCodeRepository = typeorm_1.getRepository(TelegramCodes_1.default);
            let telegramCode = null;
            try {
                telegramCode = yield telegramCodeRepository.findOneOrFail({
                    where: { code, type },
                });
            }
            catch (error) {
                return null;
            }
            return telegramCode;
        });
    }
    generateCode(id, length) {
        let text = "";
        const possible = `ABCDEFGHIJKLMNOPQRSTUVWXYZ${id}`;
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
    generateTelegramCode(ref, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const telegramCodeRepository = typeorm_1.getRepository(TelegramCodes_1.default);
            const code = this.generateCode(ref, 6);
            let telegramCode = yield telegramCodeRepository.findOne({
                where: { ref, type },
            });
            if (telegramCode) {
                return telegramCode;
            }
            telegramCode = new TelegramCodes_1.default();
            telegramCode.code = code;
            telegramCode.createdAt = new Date();
            telegramCode.expired = false;
            telegramCode.ref = ref;
            telegramCode.type = type;
            telegramCode = yield telegramCodeRepository.save(telegramCode);
            return telegramCode;
        });
    }
    deleteTelegramCode(ref, code) {
        return __awaiter(this, void 0, void 0, function* () {
            let telegramCodeRepository = typeorm_1.getRepository(TelegramCodes_1.default);
            let telegramCode = null;
            try {
                telegramCode = yield telegramCodeRepository.findOneOrFail({
                    where: { ref, code },
                });
                if (telegramCode) {
                    yield telegramCodeRepository.remove(telegramCode);
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.TelegramCodeBO = TelegramCodeBO;
//# sourceMappingURL=telegramCodeBO.js.map