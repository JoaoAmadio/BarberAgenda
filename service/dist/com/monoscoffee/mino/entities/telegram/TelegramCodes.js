"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let TelegramCode = class TelegramCode extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.expired = false;
    }
    id(id) {
        throw new Error("Method not implemented.");
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: "telegram_code_id" }),
    __metadata("design:type", Number)
], TelegramCode.prototype, "telegramCodeId", void 0);
__decorate([
    typeorm_1.Column({ name: "code" }),
    __metadata("design:type", String)
], TelegramCode.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({ name: "type" }),
    __metadata("design:type", String)
], TelegramCode.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ name: "ref" }),
    __metadata("design:type", Number)
], TelegramCode.prototype, "ref", void 0);
__decorate([
    typeorm_1.Column({ name: "created_at" }),
    __metadata("design:type", Date)
], TelegramCode.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({ name: "expired" }),
    __metadata("design:type", Boolean)
], TelegramCode.prototype, "expired", void 0);
TelegramCode = __decorate([
    typeorm_1.Unique(["code", "ref"]),
    typeorm_1.Entity({ name: "telegram_code", synchronize: true })
], TelegramCode);
exports.default = TelegramCode;
//# sourceMappingURL=TelegramCodes.js.map