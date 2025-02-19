import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';

@Injectable()
export class CoachsService {
  constructor(
    @Inject('MONGO_DB')
    private readonly db: Db,
  ) {}

  coachs = this.db.collection('coachs');

  findAllCoachs() {
    return this.coachs.find().toArray();
  }

  async findOneCoach(id: string) {
    if (!id) {
      throw new BadRequestException('Coach ID is required');
    }

    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch {
      query = { _id: id };
    }

    const coach = await this.db.collection('coachs').findOne(query);
    if (!coach) {
      throw new NotFoundException(`Coach #${id} not found`);
    }
    return coach;
  }
}
