import { DefaultDAOInterface } from "../interfaces/defaultDAOInterface";
import { EntitySchema, getConnection } from "typeorm";
import { ObjectType } from "typeorm/common/ObjectType";
import { ObjectID } from "typeorm/driver/mongodb/typings";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { FindManyOptions } from "typeorm/find-options/FindManyOptions";
import { SaveOptions } from "typeorm/repository/SaveOptions";

export class DefaultDAO implements DefaultDAOInterface {
  async delete(
    targetOrEntity: ObjectType<any> | EntitySchema<any> | string,
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | any
  ): Promise<DeleteResult> {
    let result = null;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      result = await queryRunner.manager.delete(targetOrEntity, criteria);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return result;
  }

  async find(
    entityClass: ObjectType<any>,
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<any>
  ): Promise<any> {
    let result = undefined;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      result = await queryRunner.manager.findOne(entityClass, id, options);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return result;
  }

  async list(
    entityClass: ObjectType<any>,
    options?: FindManyOptions<any>
  ): Promise<any[]> {
    let result = undefined;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      result = await queryRunner.manager.find(entityClass);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return result;
  }

  async save(entity: any, options?: SaveOptions): Promise<any> {
    let result = undefined;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      result = await queryRunner.manager.save(entity, options);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return result;
  }
}
