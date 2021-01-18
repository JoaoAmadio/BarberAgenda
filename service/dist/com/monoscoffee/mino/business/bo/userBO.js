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
exports.UserBO = void 0;
const defaultDAO_1 = require("../core/dao/defaultDAO");
const user_1 = __importDefault(require("../../entities/user"));
const typeorm_1 = require("typeorm");
const person_1 = __importDefault(require("../../entities/person"));
class UserBO extends defaultDAO_1.DefaultDAO {
    constructor() {
        super();
    }
    checkUserCredentials(enrollment, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log({ enrollment, password });
            const userRepository = typeorm_1.getRepository(user_1.default);
            let user = null;
            try {
                user = yield userRepository.findOneOrFail({
                    where: { enrollment, password },
                });
            }
            catch (error) {
                return null;
            }
            return user;
        });
    }
    findByRef(ref) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(user_1.default);
            let user = null;
            try {
                user = yield userRepository.findOneOrFail({
                    where: { ref },
                });
            }
            catch (error) {
                return null;
            }
            return user;
        });
    }
    findByPersonId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(user_1.default);
            const personRepository = typeorm_1.getRepository(person_1.default);
            let user = null;
            let person = null;
            try {
                person = yield personRepository.findOneOrFail({
                    where: { personId: id },
                });
                user = yield userRepository.findOneOrFail({ where: { person: person } });
            }
            catch (error) {
                return null;
            }
            return user;
        });
    }
}
exports.UserBO = UserBO;
//# sourceMappingURL=userBO.js.map