import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdherentDto } from './dto/create-adherent.dto';
import { UpdateAdherentDto } from './dto/update-adherent.dto';
import { Db, ObjectId } from 'mongodb';

@Injectable()
export class AdherentsService {
  constructor(
    @Inject('MONGO_DB')
    private readonly db: Db,
  ) {}

  adherents = this.db.collection('adherents');

  findAll() {
    return this.adherents.find().toArray();
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('Adherent ID is required');
    }
    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch {
      query = { _id: id };
    }

    const adherent = await this.adherents.findOne(query);
    if (!adherent) {
      throw new NotFoundException(`Adherent #${id} not found`);
    }
    return adherent;
  }

  async createAdherent(createAdherentDto: CreateAdherentDto) {
    const adherentToInsert = {
      ...createAdherentDto,
      _id: createAdherentDto._id || Date.now().toString(),
    } as unknown as Document;

    const result = await this.adherents.insertOne(adherentToInsert);
    return result;
  }

  async update(id: string, adherentUpdate: UpdateAdherentDto) {
    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch {
      query = { _id: id };
    }
    const result = await this.adherents.updateOne(
      query,
      { $set: adherentUpdate },
    );
    if (result.matchedCount === 0) {
      throw new NotFoundException(`Adherent #${id} not found`);
    }
    return result;
  }

  async removeAdherent(id: string) {
    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch {
      query = { _id: id };
    }
    const result = await this.adherents.deleteOne(query);
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Adherent #${id} not found`);
    }
    return result;
  }
}
