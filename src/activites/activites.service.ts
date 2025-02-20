import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateActiviteDto } from './dto/create-activite.dto';
import { UpdateActiviteDto } from './dto/update-activite.dto';
import { Db, ObjectId } from 'mongodb';

@Injectable()
export class ActivitesService {
  private activites;

  constructor(
    @Inject('MONGO_DB')
    private readonly db: Db,
  ) {
    this.activites = this.db.collection('activites');
  }

  async findAll() {
    return this.activites.find().toArray();
  }

  async findOne(id: string) {
    const activite = await this.activites.findOne({ _id: new ObjectId(id) });
    if (!activite) {
      throw new NotFoundException(`Activite with ID ${id} not found`);
    }
    return activite;
  }

  async create(createActiviteDto: CreateActiviteDto) {
    const result = await this.activites.insertOne(createActiviteDto);
    return result.ops[0];
  }

  async update(id: string, updateActiviteDto: UpdateActiviteDto) {
    const result = await this.activites.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateActiviteDto },
      { returnOriginal: false },
    );
    if (!result.value) {
      throw new NotFoundException(`Activite with ID ${id} not found`);
    }
    return result.value;
  }

  async remove(id: string) {
    const result = await this.activites.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Activite with ID ${id} not found`);
    }
  }
}