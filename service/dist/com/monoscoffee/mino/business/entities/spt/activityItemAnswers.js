"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = __importDefault(require("./user"));
const activityItem_1 = __importDefault(require("./activityItem"));
let ActivityItemAnswers = class ActivityItemAnswers extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: "activity_item_answer_id" })
], ActivityItemAnswers.prototype, "activityItemAnswerId", void 0);
__decorate([
    typeorm_1.Column({ name: "value" })
], ActivityItemAnswers.prototype, "value", void 0);
__decorate([
    typeorm_1.Column({ name: "valid_value" })
], ActivityItemAnswers.prototype, "validValue", void 0);
__decorate([
    typeorm_1.Column({ name: "answered_at" })
], ActivityItemAnswers.prototype, "answeredAt", void 0);
__decorate([
    typeorm_1.Column({ name: "valid" })
], ActivityItemAnswers.prototype, "isValid", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => activityItem_1.default, { eager: true, cascade: ["update", "insert"] }),
    typeorm_1.JoinColumn({ name: "activity_item_id", referencedColumnName: "activityItemId" })
], ActivityItemAnswers.prototype, "activityItem", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_1.default, { eager: true, cascade: ["update", "insert"] }),
    typeorm_1.JoinColumn({ name: "target_id", referencedColumnName: "userId" })
], ActivityItemAnswers.prototype, "target", void 0);
ActivityItemAnswers = __decorate([
    typeorm_1.Entity({ database: "classroom", name: "activity_item_answers" })
], ActivityItemAnswers);
exports.default = ActivityItemAnswers;
//# sourceMappingURL=activityItemAnswers.js.map