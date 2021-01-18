"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Person = class Person extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: "person_id" })
], Person.prototype, "personId", void 0);
__decorate([
    typeorm_1.Column({ name: "first_name" })
], Person.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({ name: "last_name" })
], Person.prototype, "lastName", void 0);
Person = __decorate([
    typeorm_1.Entity({ database: "classroom", name: "person" })
], Person);
exports.default = Person;
//# sourceMappingURL=person.js.map