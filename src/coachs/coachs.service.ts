import { Injectable, NotFoundException } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { Inject } from '@nestjs/common';
import { Coach } from './entities/coach.entity';

@Injectable()
export class CoachsService {
  private coachs;

  constructor(@Inject('MONGO_DB') private readonly db: Db) {
    this.coachs = this.db.collection('coachs');
  }

  // 🔹 Récupérer tous les coachs
  async findAllCoachs(): Promise<Coach[]> {
    return this.coachs.find().toArray();
  }

  // 🔹 Trouver un coach par ID
  async findOneCoach(id: string): Promise<Coach> {
    const coach = await this.coachs.findOne({ _id: id });
    if (!coach) {
      throw new NotFoundException(`Coach with ID ${id} not found`);
    }
    return coach;
  }

  // 🔹 Ajouter un coach (Ajouté)
  async createCoach(coachData: Partial<Coach>): Promise<string> {
    const result = await this.coachs.insertOne({ ...coachData, dateInscription: new Date() });
    return result.insertedId.toString();
  }

  // 🔹 Mettre à jour un coach (Ajouté)
  async updateCoach(id: string, updateData: Partial<Coach>): Promise<Coach> {
    const result = await this.coachs.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { returnDocument: 'after' }
    );
    if (!result.value) {
      throw new NotFoundException(`Coach with ID ${id} not found`);
    }
    return result.value;
  }

  // 🔹 Supprimer un coach (Ajouté)
  async removeCoach(id: string): Promise<void> {
    const result = await this.coachs.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Coach with ID ${id} not found`);
    }
  }

  // 🔹 Trouver les coachs par spécialité (Ajouté)
  async findBySpeciality(specialite: string): Promise<Coach[]> {
    return this.coachs.find({ specialite }).toArray();
  }

  // 🔹 Compter le nombre total de coachs (Ajouté)
  async countCoachs(): Promise<number> {
    return this.coachs.countDocuments();
  }
}
