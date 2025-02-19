import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdherentDto } from './dto/create-adherent.dto';
import { UpdateAdherentDto } from './dto/update-adherent.dto';
import { Db, ObjectId } from 'mongodb';
import { CoachsService } from 'src/coachs/coachs.service';

@Injectable()
export class AdherentsService {
  constructor(
    @Inject('MONGO_DB')
    private readonly db: Db,
    private readonly coachsService: CoachsService,
  ) {}

  findAll() {
    return this.db.collection('adherents').find().toArray();
  }

  async findById(id: string) {
    if (!id) {
      throw new BadRequestException('Adherent ID is required');
    }
    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch {
      query = { _id: id };
    }

    const adherent = await this.db.collection('adherents').findOne(query);
    if (!adherent) {
      throw new NotFoundException(`Adherent #${id} not found`);
    }
    return adherent;
  }

  async findByName(nom: string) {
    if (!nom) {
      throw new BadRequestException('Adherent name is required');
    }
    const adherent = await this.db
      .collection('adherents')
      .findOne({ nom: nom });

    console.log('adherent', adherent);
    if (!adherent) {
      throw new NotFoundException(`Adherent ${nom} not found`);
    }
    return adherent;
  }

  async createAdherent(createAdherentDto: CreateAdherentDto) {
    // const adherentToInsert = {
    //   ...createAdherentDto,
    //   _id: createAdherentDto._id || Date.now().toString(),
    // } as unknown as Document;

    // First verify if coach exists
    try {
      await this.coachsService.findOneCoach(createAdherentDto.coach_id);
    } catch (error) {
      throw new BadRequestException(
        `Invalid coach_id: ${createAdherentDto.coach_id}`,
      );
    }

    const adherentToInsert = {
      ...createAdherentDto,
      date_inscription: new Date().toISOString(),
    };
    const result = await this.db
      .collection('adherents')
      .insertOne(adherentToInsert);
    return result;
  }

  async updateAdherent(id: string, adherentUpdate: UpdateAdherentDto) {
    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch {
      query = { _id: id };
    }

    if (adherentUpdate.coach_id) {
    try {
      await this.coachsService.findOneCoach(adherentUpdate.coach_id);
      
    } catch (error) {
      throw new BadRequestException(
        `Invalid coach_id: ${adherentUpdate.coach_id}`,
      );
    }}
    const result = await this.db.collection('adherents').updateOne(query, {
      $set: adherentUpdate,
    });
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
    const result = await this.db.collection('adherents').deleteOne(query);
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Adherent #${id} not found`);
    }
    return result;
  }
}
