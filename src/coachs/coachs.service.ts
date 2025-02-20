import { Injectable, NotFoundException } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { Inject } from '@nestjs/common';
import { Coach } from './entities/coach.entity';

@Injectable()
export class CoachsService {
  private coachs;

  constructor(
    @Inject('MONGO_DB')
    private readonly db: Db,
  ) {
    this.coachs = this.db.collection('coachs');
  }

  async findAllCoachs(): Promise<Coach[]> {
    return this.coachs.find().toArray();
  }

  async findOneCoach(id: string): Promise<Coach> {
    const coach = await this.coachs.findOne({ _id: new ObjectId(id) });
    if (!coach) {
      throw new NotFoundException(`Coach with ID ${id} not found`);
    }
    return coach;
  }
}