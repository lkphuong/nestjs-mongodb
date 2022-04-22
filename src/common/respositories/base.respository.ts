import { Injectable } from '@nestjs/common';
import { Document, Model, FilterQuery, UpdateQuery, ObjectId } from 'mongoose';
import { getDateNow } from '../helpers/datetime.helper';

@Injectable()
export abstract class BaseRespository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findAll(): Promise<T[] | null> {
    return this.entityModel.find({ deleted: false }).exec();
  }

  async find(entityFilterQuery: FilterQuery<T | null>, populate?: any) {
    return this.entityModel.find(entityFilterQuery).populate(populate).exec();
  }

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findOne(entityFilterQuery, {
        _v: 0,
        ...projection,
      })
      .exec();
  }

  async findByID(id: ObjectId): Promise<T> {
    return this.entityModel.findById(id).exec();
  }

  async countTotal(findObj: any): Promise<number> {
    return this.entityModel.countDocuments(findObj);
  }

  async create(userId: ObjectId, createEntityData: {}): Promise<T> {
    const entity = new this.entityModel({
      ...createEntityData,
      createdBy: userId,
    });

    return entity.save();
  }

  async findOneAndUpdate(
    userId: ObjectId,
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      {
        ...updateEntityData,
        updatedBy: userId,
        updatedAt: getDateNow(),
      },
      {
        new: true,
      },
    );
  }

  async deleteOne(
    userId: ObjectId,
    entityFilterQuery: FilterQuery<T>,
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(entityFilterQuery, {
      deleted: true,
      deletedAt: getDateNow(),
      deletedBy: userId,
    });
  }

  async deleteById(userId: ObjectId, id: ObjectId): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      { _id: id },
      {
        deleted: true,
        deletedAt: getDateNow(),
        deletedBy: userId,
      },
    );
  }
}
