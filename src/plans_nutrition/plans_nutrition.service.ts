import { Injectable, NotFoundException } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { Inject } from '@nestjs/common';
import { CreatePlanNutritionDto } from './dto/create-plan_nutrition.dto';
import { UpdatePlanNutritionDto } from './dto/update-plan_nutrition.dto';
import { PlanNutrition } from './entities/plan_nutrition.entity';

@Injectable()
export class PlansNutritionService {
  private plansNutrition;

  constructor(@Inject('MONGO_DB') private readonly db: Db) {
    this.plansNutrition = this.db.collection('plans_nutrition');
  }

  // 🔹 Récupérer tous les plans nutritionnels
  async findAll(): Promise<PlanNutrition[]> {
    return this.plansNutrition.find().toArray();
  }

  // 🔹 Trouver un plan par ID
  async findOne(id: string): Promise<PlanNutrition> {
    const planNutrition = await this.plansNutrition.findOne({ _id: id });
    if (!planNutrition) {
      throw new NotFoundException(`Plan nutrition with ID ${id} not found`);
    }
    return planNutrition;
  }

  // 🔹 Créer un plan nutritionnel
  async create(createPlanNutritionDto: CreatePlanNutritionDto): Promise<string> {
    const result = await this.plansNutrition.insertOne({
      ...createPlanNutritionDto,
      dateCreation: new Date(), // Ajout d'un timestamp
    });
    return result.insertedId.toString();
  }

  // 🔹 Mettre à jour un plan nutritionnel
  async update(id: string, updatePlanNutritionDto: UpdatePlanNutritionDto): Promise<PlanNutrition> {
    const result = await this.plansNutrition.findOneAndUpdate(
      { _id: id },
      { $set: updatePlanNutritionDto },
      { returnDocument: 'after' }
    );
    if (!result.value) {
      throw new NotFoundException(`Plan nutrition with ID ${id} not found`);
    }
    return result.value;
  }

  // 🔹 Supprimer un plan nutritionnel
  async remove(id: string): Promise<void> {
    const result = await this.plansNutrition.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Plan nutrition with ID ${id} not found`);
    }
  }

  // 🔹 Trouver les plans d'un adhérent spécifique
  async findByAdherent(adherentId: string): Promise<PlanNutrition[]> {
    return this.plansNutrition.find({ adherentId: adherentId }).toArray();
  }

  // 🔹 Compter le nombre total de plans nutritionnels
  async countPlans(): Promise<number> {
    return this.plansNutrition.countDocuments();
  }

  // 🔹 Filtrer les plans nutritionnels par date de création
  async findByDateRange(startDate: Date, endDate: Date): Promise<PlanNutrition[]> {
    return this.plansNutrition
      .find({ dateCreation: { $gte: startDate, $lte: endDate } })
      .toArray();
  }
}
