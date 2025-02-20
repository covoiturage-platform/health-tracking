import { Injectable, NotFoundException } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { Inject } from '@nestjs/common';
import { CreatePlanNutritionDto } from './dto/create-plan_nutrition.dto';
import { UpdatePlanNutritionDto } from './dto/update-plan_nutrition.dto';
import { PlanNutrition } from './entities/plan_nutrition.entity';

@Injectable()
export class PlansNutritionService {
  private plansNutrition;

  constructor(
    @Inject('MONGO_DB')
    private readonly db: Db,
  ) {
    this.plansNutrition = this.db.collection('plans_nutrition');
  }

  async findAll(): Promise<PlanNutrition[]> {
    return this.plansNutrition.find().toArray();
  }

  async findOne(id: string): Promise<PlanNutrition> {
    const planNutrition = await this.plansNutrition.findOne({ _id: new ObjectId(id) });
    if (!planNutrition) {
      throw new NotFoundException(`Plan nutrition with ID ${id} not found`);
    }
    return planNutrition;
  }

  async create(createPlanNutritionDto: CreatePlanNutritionDto): Promise<PlanNutrition> {
    const result = await this.plansNutrition.insertOne(createPlanNutritionDto);
    return result.ops[0];
  }

  async update(id: string, updatePlanNutritionDto: UpdatePlanNutritionDto): Promise<PlanNutrition> {
    const result = await this.plansNutrition.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updatePlanNutritionDto },
      { returnOriginal: false },
    );
    if (!result.value) {
      throw new NotFoundException(`Plan nutrition with ID ${id} not found`);
    }
    return result.value;
  }

  async remove(id: string): Promise<void> {
    const result = await this.plansNutrition.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Plan nutrition with ID ${id} not found`);
    }
  }
}