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
var ActivityItem_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const activity_1 = __importDefault(require("./activity"));
const category_1 = __importDefault(require("./category"));
let ActivityItem = ActivityItem_1 = class ActivityItem extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: "activity_item_id" })
], ActivityItem.prototype, "activityItemId", void 0);
__decorate([
    typeorm_1.Column({ name: "type" })
], ActivityItem.prototype, "type", void 0);
__decorate([
    typeorm_1.Column("longtext", { name: "header", nullable: true })
], ActivityItem.prototype, "header", void 0);
__decorate([
    typeorm_1.Column("longtext", { name: "description" })
], ActivityItem.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ name: "value", nullable: true, default: null })
], ActivityItem.prototype, "value", void 0);
__decorate([
    typeorm_1.Column({ name: "required", default: false })
], ActivityItem.prototype, "required", void 0);
__decorate([
    typeorm_1.Column({ name: "sub_item" })
], ActivityItem.prototype, "isSubItem", void 0);
__decorate([
    typeorm_1.Column({ name: "multiselect" })
], ActivityItem.prototype, "multiselect", void 0);
__decorate([
    typeorm_1.Column({ name: "sequence" })
], ActivityItem.prototype, "sequence", void 0);
__decorate([
    typeorm_1.Column({ name: "ponderosity", type: "double" })
], ActivityItem.prototype, "ponderosity", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => activity_1.default, { eager: true, cascade: ["update", "insert"] }),
    typeorm_1.JoinColumn({ name: "activity_id", referencedColumnName: "activityId" })
], ActivityItem.prototype, "activity", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => ActivityItem_1, { cascade: ["update", "insert"] }),
    typeorm_1.JoinColumn({ name: "activity_sub_item_origin_id", referencedColumnName: "activityItemId" })
], ActivityItem.prototype, "activitySubItemOrigin", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => category_1.default, { eager: true, cascade: ["update", "insert"] }),
    typeorm_1.JoinColumn({ name: "category_id", referencedColumnName: "categoryId" })
], ActivityItem.prototype, "category", void 0);
ActivityItem = ActivityItem_1 = __decorate([
    typeorm_1.Entity({ database: "classroom", name: "activity_item" })
], ActivityItem);
exports.default = ActivityItem;
//# sourceMappingURL=activityItem.js.map