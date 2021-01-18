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
let Activity = class Activity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: "activity_id" })
], Activity.prototype, "activityId", void 0);
__decorate([
    typeorm_1.Column({ name: "uuid" })
], Activity.prototype, "uuid", void 0);
__decorate([
    typeorm_1.Column({ name: "title" })
], Activity.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ name: "sub_title" })
], Activity.prototype, "subTitle", void 0);
__decorate([
    typeorm_1.Column({ name: "description" })
], Activity.prototype, "description", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_1.default, { eager: true, cascade: ["update", "insert"] }),
    typeorm_1.JoinColumn({ name: "author_id", referencedColumnName: "userId" })
], Activity.prototype, "author", void 0);
__decorate([
    typeorm_1.Column({ name: "creation_date" }),
    typeorm_1.CreateDateColumn()
], Activity.prototype, "creationDate", void 0);
__decorate([
    typeorm_1.Column({ name: "expiration_date", nullable: true })
], Activity.prototype, "expirationDate", void 0);
__decorate([
    typeorm_1.Column({ name: "countdown" })
], Activity.prototype, "countdown", void 0);
__decorate([
    typeorm_1.Column({ name: "score" })
], Activity.prototype, "score", void 0);
Activity = __decorate([
    typeorm_1.Entity({ database: "classroom", name: "activity" })
], Activity);
exports.default = Activity;
//# sourceMappingURL=activity.js.map