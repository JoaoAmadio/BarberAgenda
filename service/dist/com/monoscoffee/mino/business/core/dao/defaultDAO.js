"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultDAO = void 0;
const typeorm_1 = require("typeorm");
class DefaultDAO {
    delete(targetOrEntity, criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = null;
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            try {
                result = yield queryRunner.manager.delete(targetOrEntity, criteria);
                yield queryRunner.commitTransaction();
            }
            catch (err) {
                console.error(err);
                yield queryRunner.rollbackTransaction();
            }
            finally {
                yield queryRunner.release();
            }
            return result;
        });
    }
    find(entityClass, id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = undefined;
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            try {
                result = yield queryRunner.manager.findOne(entityClass, id, options);
                yield queryRunner.commitTransaction();
            }
            catch (err) {
                console.error(err);
                yield queryRunner.rollbackTransaction();
            }
            finally {
                yield queryRunner.release();
            }
            return result;
        });
    }
    list(entityClass, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = undefined;
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            try {
                result = yield queryRunner.manager.find(entityClass);
                yield queryRunner.commitTransaction();
            }
            catch (err) {
                console.error(err);
                yield queryRunner.rollbackTransaction();
            }
            finally {
                yield queryRunner.release();
            }
            return result;
        });
    }
    save(entity, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = undefined;
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            try {
                result = yield queryRunner.manager.save(entity, options);
                yield queryRunner.commitTransaction();
            }
            catch (err) {
                console.error(err);
                yield queryRunner.rollbackTransaction();
            }
            finally {
                yield queryRunner.release();
            }
            return result;
        });
    }
}
exports.DefaultDAO = DefaultDAO;
//# sourceMappingURL=defaultDAO.js.map