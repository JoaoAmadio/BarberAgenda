"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const userBO_1 = require("../business/bo/userBO");
const jwt = __importStar(require("jsonwebtoken"));
const environment_1 = require("../environments/environment");
const telegramCodeBO_1 = require("../business/bo/telegramCodeBO");
const user_1 = __importDefault(require("../entities/user"));
const typeorm_1 = require("typeorm");
exports.default = new (class userController {
    checkLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if username and password are set
            let { enrollment, password } = req.body;
            if (!(enrollment && password)) {
                res.status(400).send();
            }
            const userBO = new userBO_1.UserBO();
            //Get user from database
            let user = yield userBO.checkUserCredentials(enrollment, password);
            if (!user) {
                res.status(401).send({
                    message: "Erro: Identificação ou senha inválidos!",
                });
                return;
            }
            //Sing JWT, valid for 1 hour
            const token = jwt.sign({ user }, environment_1.environment.SECRET, { expiresIn: "24h" });
            //Send the jwt in the response
            res.status(200).send({ token });
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type } = req.query;
            const { username, code, password } = req.body;
            const userBO = new userBO_1.UserBO();
            if (type == "TELEGRAM") {
                const telegramCodesBO = new telegramCodeBO_1.TelegramCodeBO();
                const telegramCode = yield telegramCodesBO.findCodeByCodeAndType(code, "REGISTER");
                if (!telegramCode) {
                    res.status(401).send({
                        message: "Erro: Código de cadastro inválido!",
                    });
                    return;
                }
                let user = yield userBO.findByRef(telegramCode.ref);
                if (user) {
                    res.status(401).send({
                        message: "Erro: Usuário já cadastrado!",
                    });
                    return;
                }
                const userRepository = typeorm_1.getRepository(user_1.default);
                user = new user_1.default();
                user.ref = String(telegramCode.ref);
                user.registerType = "TELEGRAM";
                user.registeredAt = new Date();
                user = yield userRepository.save(user);
                if (!(yield telegramCodesBO.deleteTelegramCode(telegramCode.ref, code))) {
                    res.status(401).send({
                        message: "Erro: Não foi possível deletar o código de cadastro!",
                    });
                    return;
                }
                res
                    .status(200)
                    .send({ message: "Usuário registrado com sucesso", status: "OK" });
            }
            else {
                let user = yield userBO.checkUserCredentials(username, password);
                if (!user) {
                    res.status(401).send({
                        message: "Erro: Identificação ou senha inválidos!",
                    });
                    return;
                }
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type } = req.query;
            const { ref, username, code, password } = req.body;
            const userBO = new userBO_1.UserBO();
            if (type == "TELEGRAM") {
                const telegramCodesBO = new telegramCodeBO_1.TelegramCodeBO();
                const telegramCode = yield telegramCodesBO.findCodeByCodeAndType(code, "LOGIN");
                if (!telegramCode) {
                    res.status(401).send({
                        message: "Erro: Código de login inválido!",
                    });
                    return;
                }
                const user = yield userBO.findByRef(telegramCode.ref);
                if (!user) {
                    res.status(401).send({
                        message: "Erro: Usuário não identificado!",
                    });
                    return;
                }
                if (!(yield telegramCodesBO.deleteTelegramCode(Number(user.ref), code))) {
                    res.status(401).send({
                        message: "Erro: Não foi possível deletar o código de cadastro!",
                    });
                    return;
                }
                //Sing JWT, valid for 1 hour
                const token = jwt.sign({ user }, environment_1.environment.SECRET, {
                    expiresIn: "24h",
                });
                //Send the jwt in the response
                res.status(200).send({ token });
            }
            else {
                let user = yield userBO.checkUserCredentials(username, password);
                if (!user) {
                    res.status(401).send({
                        message: "Erro: Identificação ou senha inválidos!",
                    });
                    return;
                }
            }
        });
    }
})();
//# sourceMappingURL=authController.js.map