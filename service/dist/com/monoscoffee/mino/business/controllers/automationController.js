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
const activityItemAnswers_1 = __importDefault(require("../entities/spt/activityItemAnswers"));
const activityBO_1 = require("../bo/activityBO");
const activity_1 = __importDefault(require("../entities/spt/activity"));
const activityItemAnswersBO_1 = require("../bo/activityItemAnswersBO");
exports.default = new (class automationController {
    list(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userBO = new userBO_1.UserBO();
                const activityBO = new activityBO_1.ActivityBO();
                const activityItemAnswersBO = new activityItemAnswersBO_1.ActivityItemAnswersBO();
                const users = yield userBO.list(user_1.default);
                const activities = yield activityBO.list(activity_1.default);
                try {
                    for (const user of users) {
                        //Para cada usuário responder uma atividade
                        for (const _activity of activities) {
                            const activity = yield activityBO.findByUUID(_activity.uuid);
                            // Verifica se a atividade existe
                            if (activity) {
                                console.log(`Usuário ${user.person.firstName} ${user.person.lastName} está respondendo a atividade ${activity.title}... `);
                                //Para cada atividade, responder um item
                                for (const activityItem of activity.items) {
                                    console.log(`Respondendo questão ${activityItem.description}... `);
                                    switch (activityItem.type) {
                                        case 1:
                                            const selectedSubItem = activityItem.subItems[Math.floor(Math.random() * activityItem.subItems.length % activityItem.subItems.length)];
                                            const validActivitySubItem = activityItem.subItems.find(x => x.ponderosity > 0);
                                            if (selectedSubItem) {
                                                let respostaAtividade = new activityItemAnswers_1.default();
                                                respostaAtividade.activityItem = selectedSubItem;
                                                respostaAtividade.answeredAt = new Date();
                                                respostaAtividade.isValid = selectedSubItem.ponderosity > 0;
                                                respostaAtividade.target = user;
                                                respostaAtividade.validValue = validActivitySubItem.value;
                                                respostaAtividade.value = selectedSubItem.value;
                                                yield activityItemAnswersBO.save(respostaAtividade);
                                                console.log(`Resposta selecionada ${selectedSubItem.value} - ${selectedSubItem.description}\n\n`);
                                            }
                                            break;
                                    }
                                }
                            }
                        }
                    }
                }
                catch (e) {
                    console.error(e);
                }
                return response.json({ users });
            }
            catch (error) {
                return response.status(404).json(error);
            }
        });
    }
    randomize(arr) {
        const randomNumber = this.randomInt(arr.length);
        console.log(`1) ${randomNumber}`);
        console.log(`2) ${randomNumber - 0.5}`);
        return arr.sort(() => Math.random() - 0.5);
    }
    randomInt(min, max) {
        if (max == null) {
            max = (min == null ? Number.MAX_SAFE_INTEGER : min);
            min = 0;
        }
        min = Math.ceil(min); // inclusive min
        max = Math.floor(max); // exclusive max
        if (min > max - 1) {
            throw new Error("Incorrect arguments.");
        }
        return min + Math.floor((max - min) * Math.random());
    }
})();
//# sourceMappingURL=automationController.js.map