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
exports.ActivityBO = void 0;
const defaultDAO_1 = require("../core/dao/defaultDAO");
const typeorm_1 = require("typeorm");
const activity_1 = __importDefault(require("../entities/spt/activity"));
const activityItemBO_1 = require("./activityItemBO");
class ActivityBO extends defaultDAO_1.DefaultDAO {
    constructor() {
        super();
    }
    findByUUID(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = typeorm_1.getRepository(activity_1.default);
            let activity = null;
            try {
                activity = yield repository.findOneOrFail({
                    where: { uuid }
                });
                const activityItemBO = new activityItemBO_1.ActivityItemBO();
                activity.items = yield activityItemBO.fetchAllByActivity(activity);
            }
            catch (error) {
                console.error(error);
                return null;
            }
            return activity;
        });
    }
}
exports.ActivityBO = ActivityBO;
//# sourceMappingURL=activityBO.js.map