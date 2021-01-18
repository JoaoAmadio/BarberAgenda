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
const userBO_1 = require("../bo/userBO");
const user_1 = __importDefault(require("../entities/spt/user"));
exports.default = new (class userController {
    list(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userBO = new userBO_1.UserBO();
                const users = yield userBO.list(user_1.default);
                return response.json({ users });
            }
            catch (error) {
                return response.status(404).json(error);
            }
        });
    }
})();
//# sourceMappingURL=userController.js.map