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
const moment_1 = __importDefault(require("moment"));
const activityItemAnswers_1 = __importDefault(require("../entities/spt/activityItemAnswers"));
const activityBO_1 = require("../bo/activityBO");
const activityItemAnswersBO_1 = require("../bo/activityItemAnswersBO");
const categoryBI_1 = __importDefault(require("../entities/bi/categoryBI"));
const categoryBO_1 = require("../bo/categoryBO");
const activityReport_1 = __importDefault(require("../entities/bi/activityReport"));
const categoryBIBO_1 = require("../bo/categoryBIBO");
const category_1 = __importDefault(require("../entities/spt/category"));
exports.default = new (class activityReportController {
    import(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryBO = new categoryBO_1.CategoryBO();
            const categoryBIBO = new categoryBIBO_1.CategoryBIBO();
            let result = {
                categories: 0
            };
            for (const category of (yield categoryBO.list(category_1.default))) {
                let newCategory = new categoryBI_1.default();
                newCategory.activityCategoryId = category.categoryId;
                newCategory.description = category.description;
                newCategory.name = category.name;
                yield categoryBIBO.save(newCategory);
                result.categories += 1;
            }
            response.status(200).json({ message: 'Objetos importados para o BI', objects: result });
        });
    }
    process(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activityBO = new activityBO_1.ActivityBO();
                const activityItemAnswersBO = new activityItemAnswersBO_1.ActivityItemAnswersBO();
                const categoryBIBO = new categoryBIBO_1.CategoryBIBO();
                let tempObjs = new Map();
                let values = [];
                const answers = (yield activityItemAnswersBO.list(activityItemAnswers_1.default));
                console.log(`Creating for ${answers.length} answer(s)...`);
                for (const activityItemAnswer of answers) {
                    console.log('Processing...');
                    const activity = yield activityBO.findByUUID(activityItemAnswer.activityItem.activity.uuid);
                    const userAnswers = answers.filter(x => x.target.userId == activityItemAnswer.target.userId);
                    // const rightActivitySubItem = activityItemOriginSubItems.find( x => x.ponderosity > 0);
                    let activityReport = tempObjs.get(activityItemAnswer.target.person.personId);
                    if (!activityReport) {
                        let obj = new activityReport_1.default();
                        obj.hits = 0;
                        obj.misses = 0;
                        obj.unsolved = activity.items.length - userAnswers.length;
                        obj.creationDate = new Date();
                        obj.author = activity.author.person;
                        obj.startedAt = userAnswers[0].answeredAt;
                        obj.finishedAt = userAnswers[userAnswers.length - 1].answeredAt;
                        const diff = moment_1.default(obj.startedAt).add(activity.countdown, 'seconds').local().diff(moment_1.default(obj.finishedAt).local());
                        obj.activityCountdown = moment_1.default(diff).seconds();
                        obj.activityCategory = yield categoryBIBO.find(categoryBI_1.default, activityItemAnswer.activityItem.category.categoryId);
                        obj.target = activityItemAnswer.target.person;
                        console.log(`New Report for ${obj.target.firstName} ${obj.target.lastName}`);
                        tempObjs.set(activityItemAnswer.target.person.personId, obj);
                        values.push(obj);
                        activityReport = tempObjs.get(activityItemAnswer.target.person.personId);
                    }
                    if (activityItemAnswer.isValid) {
                        activityReport.hits += 1;
                    }
                    else {
                        activityReport.misses += 1;
                    }
                    console.log(activityReport);
                    // tempObjs.set(activityItemAnswer.target.userId, activityReport);
                }
                response.status(200).json({ values });
            }
            catch (error) {
                console.log(error);
                response.status(404).json(error);
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
//# sourceMappingURL=activityReportController.js.map