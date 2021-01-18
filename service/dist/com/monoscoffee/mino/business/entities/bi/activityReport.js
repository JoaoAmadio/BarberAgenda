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
const person_1 = __importDefault(require("../spt/person"));
const categoryBI_1 = __importDefault(require("./categoryBI"));
let ActivityReport = class ActivityReport extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: "activity_report_id" })
], ActivityReport.prototype, "activityReportId", void 0);
__decorate([
    typeorm_1.Column({ name: "hits" })
], ActivityReport.prototype, "hits", void 0);
__decorate([
    typeorm_1.Column({ name: "misses" })
], ActivityReport.prototype, "misses", void 0);
__decorate([
    typeorm_1.Column({ name: "unsolved" })
], ActivityReport.prototype, "unsolved", void 0);
__decorate([
    typeorm_1.Column({ name: "creation_date" }),
    typeorm_1.CreateDateColumn()
], ActivityReport.prototype, "creationDate", void 0);
__decorate([
    typeorm_1.Column({ name: "started_at" })
], ActivityReport.prototype, "startedAt", void 0);
__decorate([
    typeorm_1.Column({ name: "finished_at" })
], ActivityReport.prototype, "finishedAt", void 0);
__decorate([
    typeorm_1.Column({ name: "activity_countdown" })
], ActivityReport.prototype, "activityCountdown", void 0);
__decorate([
    typeorm_1.Column({ name: "final_score" })
], ActivityReport.prototype, "finalScore", void 0);
__decorate([
    typeorm_1.OneToOne((type) => categoryBI_1.default, { eager: true, cascade: ["update", "insert"] }),
    typeorm_1.JoinColumn({ name: "activity_category_id", referencedColumnName: "activityCategoryId" })
], ActivityReport.prototype, "activityCategory", void 0);
__decorate([
    typeorm_1.OneToOne((type) => person_1.default, { eager: true, cascade: ["update", "insert"] }),
    typeorm_1.JoinColumn({ name: "target_person_id", referencedColumnName: "personId" })
], ActivityReport.prototype, "target", void 0);
__decorate([
    typeorm_1.OneToOne((type) => person_1.default, { eager: true, cascade: ["update", "insert"] }),
    typeorm_1.JoinColumn({ name: "author_person_id", referencedColumnName: "personId" })
], ActivityReport.prototype, "author", void 0);
ActivityReport = __decorate([
    typeorm_1.Entity({ database: "classroom_bi", name: "ActivityReport" })
], ActivityReport);
exports.default = ActivityReport;
//# sourceMappingURL=activityReport.js.map