import { Inject, Injectable } from '@nestjs/common';
import { CreateAdherentDto } from './dto/create-adherent.dto';
import { UpdateAdherentDto } from './dto/update-adherent.dto';
import { Db } from 'mongodb';

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

  findOne(id: number) {

  }

  create(adherent: CreateAdherentDto) {

  }

  update(id: number, adherentUpdate: UpdateAdherentDto) {

  }

  remove(id: number) {

  }
}
