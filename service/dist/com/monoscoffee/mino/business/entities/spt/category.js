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
let Category = class Category extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: "category_id" })
], Category.prototype, "categoryId", void 0);
__decorate([
    typeorm_1.Column({ name: "name" })
], Category.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: "description" })
], Category.prototype, "description", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_1.default, { eager: true, cascade: ["update", "insert"] }),
    typeorm_1.JoinColumn({ name: "author_id", referencedColumnName: "userId" })
], Category.prototype, "author", void 0);
Category = __decorate([
    typeorm_1.Entity({ database: "classroom", name: "category" })
], Category);
exports.default = Category;
//# sourceMappingURL=category.js.map