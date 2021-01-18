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
exports.ActivityItemBO = void 0;
const defaultDAO_1 = require("../core/dao/defaultDAO");
const typeorm_1 = require("typeorm");
const activityItem_1 = __importDefault(require("../entities/spt/activityItem"));
class ActivityItemBO extends defaultDAO_1.DefaultDAO {
    constructor() {
        super();
    }
    fetchAllByActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = typeorm_1.getRepository(activityItem_1.default);
            let activityItem = null;
            const isSubItem = false;
            try {
                activityItem = yield repository.find({
                    where: { activity, isSubItem }
                });
                for (let item of activityItem) {
                    item.subItems = yield this.fetchAllSubItemsByActivityAndActivityItemOrigin(activity, item);
                }
            }
            catch (error) {
                console.error(error);
                return null;
            }
            return activityItem;
        });
    }
    fetchAllSubItemsByActivityAndActivityItemOrigin(activity, activitySubItemOrigin) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = typeorm_1.getRepository(activityItem_1.default);
            let activityItem = null;
            const isSubItem = true;
            try {
                activityItem = yield repository.find({
                    where: { activity, isSubItem, activitySubItemOrigin }
                });
            }
            catch (error) {
                console.error(error);
                return null;
            }
            return activityItem;
        });
    }
}
exports.ActivityItemBO = ActivityItemBO;
//# sourceMappingURL=activityItemBO.js.map