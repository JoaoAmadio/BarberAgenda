"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let CategoryBI = class CategoryBI extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: "category_id" })
], CategoryBI.prototype, "activityCategoryId", void 0);
__decorate([
    typeorm_1.Column({ name: "name" })
], CategoryBI.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: "description" })
], CategoryBI.prototype, "description", void 0);
CategoryBI = __decorate([
    typeorm_1.Entity({ database: "classroom_bi", name: "category" })
], CategoryBI);
exports.default = CategoryBI;
//# sourceMappingURL=categoryBI.js.map