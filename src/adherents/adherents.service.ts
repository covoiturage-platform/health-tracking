import { Inject, Injectable } from '@nestjs/common';
import { CreateAdherentDto } from './dto/create-adherent.dto';
import { UpdateAdherentDto } from './dto/update-adherent.dto';
import { Db, ObjectId } from 'mongodb';

@Injectable()
export class AdherentsService {
  private adherents;

  constructor(@Inject('MONGO_DB') private readonly db: Db) {
    this.adherents = this.db.collection('adherents');
  }

  // 🔹 Récupérer tous les adhérents
  async findAll() {
    return this.adherents.find().toArray();
  }

  // 🔹 Trouver un adhérent par ID
  async findOne(id: string) {
    return this.adherents.findOne({ _id: id });
  }

  // 🔹 Trouver un adhérent par email (Ajouté)
  async findByEmail(email: string) {
    return this.adherents.findOne({ email });
  }

  // 🔹 Ajouter un adhérent (Correction)
  async create(adherent: CreateAdherentDto) {
    const result = await this.adherents.insertOne({ ...adherent, dateInscription: new Date() });
    return result.insertedId;
  }

  // 🔹 Mettre à jour un adhérent (Correction)
  async update(id: string, adherentUpdate: UpdateAdherentDto) {
    return this.adherents.findOneAndUpdate(
      { _id: id },
      { $set: adherentUpdate },
      { returnDocument: 'after' }
    );
  }

  // 🔹 Mettre à jour le poids d’un adhérent (Ajouté)
  async updateWeightByEmail(email: string, nouveauPoids: number) {
    return this.adherents.updateOne(
      { email: email },
      { $set: { poids_actuel: nouveauPoids } }
    );
  }

  // 🔹 Supprimer un adhérent
  async remove(id: string) {
    return this.adherents.deleteOne({ _id: id });
  }

  // 🔹 Compter le nombre total d'adhérents (Ajouté)
  async countAdherents(): Promise<number> {
    return this.adherents.countDocuments();
  }

  // 🔹 Récupérer les adhérents d’un coach (Ajouté)
  async findByCoach(coachId: string) {
    return this.adherents.find({ coach_id: coachId }).toArray();
  }

  // 🔹 Supprimer tous les adhérents d’un coach (Ajouté)
  async deleteByCoach(coachId: string) {
    return this.adherents.deleteMany({ coach_id: coachId });
  }
}
