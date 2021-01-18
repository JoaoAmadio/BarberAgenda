"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const person_1 = __importDefault(require("./person"));
const bcrypt = __importStar(require("bcryptjs"));
let User = class User extends typeorm_1.BaseEntity {
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    checkIfUnencryptedPasswordIsValid(unencryptedPassword) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: "user_id" })
], User.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({ name: "enrollment" })
], User.prototype, "enrollment", void 0);
__decorate([
    typeorm_1.Column({ name: "mail" })
], User.prototype, "mail", void 0);
__decorate([
    typeorm_1.Column({ name: "password" })
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.OneToOne((type) => person_1.default, { eager: true, cascade: ["update", "insert"] }),
    typeorm_1.JoinColumn({ name: "person_id", referencedColumnName: "personId" })
], User.prototype, "person", void 0);
User = __decorate([
    typeorm_1.Unique(['enrollment', 'mail']),
    typeorm_1.Entity({ database: "classroom", name: "user" })
], User);
exports.default = User;
//# sourceMappingURL=user.js.map