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
const activityBO_1 = require("../bo/activityBO");
const activity_1 = __importDefault(require("../entities/spt/activity"));
exports.default = new (class ActivityController {
    list(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activityBO = new activityBO_1.ActivityBO();
                const activities = yield activityBO.list(activity_1.default);
                return response.json(activities);
            }
            catch (error) {
                return response.status(404).json(error);
            }
        });
    }
    fetch(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { uuid } = request.params;
                const activityBO = new activityBO_1.ActivityBO();
                const activity = yield activityBO.findByUUID(uuid);
                return response.json(activity);
            }
            catch (error) {
                return response.status(404).json(error);
            }
        });
    }
})();
//# sourceMappingURL=activityController.js.map