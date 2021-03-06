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
Object.defineProperty(exports, "__esModule", { value: true });
const userBO_1 = require("../bo/userBO");
const jwt = __importStar(require("jsonwebtoken"));
const environment_1 = require("../../environments/environment");
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
})();
//# sourceMappingURL=authController.js.map