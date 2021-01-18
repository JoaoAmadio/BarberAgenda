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
const device_1 = __importDefault(require("./device"));
let UserDevices = class UserDevices extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: "user_devices_id" })
], UserDevices.prototype, "userDevicesId", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_1.default, { eager: true, cascade: ["update", "insert"] }),
    typeorm_1.JoinColumn({ name: "user_id", referencedColumnName: "userId" })
], UserDevices.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => device_1.default, { eager: true, cascade: ["update", "insert"] }),
    typeorm_1.JoinColumn({ name: "device_id", referencedColumnName: "deviceId" })
], UserDevices.prototype, "device", void 0);
__decorate([
    typeorm_1.Column({ name: "ip" })
], UserDevices.prototype, "ip", void 0);
__decorate([
    typeorm_1.Column({ name: "last_login" })
], UserDevices.prototype, "lastLogin", void 0);
__decorate([
    typeorm_1.Column({ name: "device_token" })
], UserDevices.prototype, "deviceToken", void 0);
__decorate([
    typeorm_1.Column({ name: "trusted" })
], UserDevices.prototype, "trusted", void 0);
__decorate([
    typeorm_1.Column({ name: "active" })
], UserDevices.prototype, "active", void 0);
UserDevices = __decorate([
    typeorm_1.Entity({ database: "classroom", name: "user_devices" })
], UserDevices);
exports.default = UserDevices;
//# sourceMappingURL=userDevices.js.map