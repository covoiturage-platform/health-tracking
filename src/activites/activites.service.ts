import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateActiviteDto } from './dto/create-activite.dto';
import { UpdateActiviteDto } from './dto/update-activite.dto';
import { Db, ObjectId } from 'mongodb';

@Injectable()
export class ActivitesService {
  private activites;

  constructor(@Inject('MONGO_DB') private readonly db: Db) {
    this.activites = this.db.collection('activites');
  }

  // 🔹 Récupérer toutes les activités
  async findAll() {
    return this.activites.find().toArray();
  }

  // 🔹 Trouver une activité par ID
  async findOne(id: string) {
    const activite = await this.activites.findOne({ _id: id });
    if (!activite) {
      throw new NotFoundException(`Activite with ID ${id} not found`);
    }
    return activite;
  }

  // 🔹 Trouver les activités d’un coach (Ajouté)
  async findByCoach(coachId: string) {
    return this.activites.find({ coachId: coachId }).toArray();
  }

  // 🔹 Trouver les activités par type (Ajouté)
  async findByType(type: string) {
    return this.activites.find({ type }).toArray();
  }

  // 🔹 Ajouter une activité (Correction)
  async create(createActiviteDto: CreateActiviteDto) {
    const result = await this.activites.insertOne({ ...createActiviteDto, dateCreation: new Date() });
    return result.insertedId;
  }

  // 🔹 Mettre à jour une activité (Correction)
  async update(id: string, updateActiviteDto: UpdateActiviteDto) {
    const result = await this.activites.findOneAndUpdate(
      { _id: id },
      { $set: updateActiviteDto },
      { returnDocument: 'after' }
    );
    if (!result.value) {
      throw new NotFoundException(`Activite with ID ${id} not found`);
    }
    return result.value;
  }

  // 🔹 Supprimer une activité
  async remove(id: string) {
    const result = await this.activites.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Activite with ID ${id} not found`);
    }
  }

  // 🔹 Compter le nombre total d’activités (Ajouté)
  async countActivites() {
    return this.activites.countDocuments();
  }

  // 🔹 Supprimer toutes les activités d’un coach (Ajouté)
  async deleteByCoach(coachId: string) {
    return this.activites.deleteMany({ coachId: coachId });
  }
}
