import { Controller, Get, Post, Body, Param, Patch, Delete, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PlansNutritionService } from './plans_nutrition.service';
import { CreatePlanNutritionDto } from './dto/create-plan_nutrition.dto';
import { UpdatePlanNutritionDto } from './dto/update-plan_nutrition.dto';
import { PlanNutrition } from './entities/plan_nutrition.entity';

@ApiTags('plans-nutrition')
@Controller('plans-nutrition')
export class PlansNutritionController {
  constructor(private readonly plansNutritionService: PlansNutritionService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all plans nutrition' })
  @ApiResponse({ status: 200, description: 'List of plans nutrition', type: [PlanNutrition] })
  findAll() {
    return this.plansNutritionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single plan nutrition by ID' })
  @ApiParam({ name: 'id', description: 'ID of the plan nutrition', type: String, example: '60d0fe4f5311236168a109ca' })
  @ApiResponse({ status: 200, description: 'The found plan nutrition', type: PlanNutrition })
  @ApiResponse({ status: 404, description: 'Plan nutrition not found' })
  findOne(@Param('id') id: string) {
    return this.plansNutritionService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new plan nutrition' })
  @ApiBody({
    description: 'Data for the new plan nutrition',
    type: CreatePlanNutritionDto,
    examples: {
      example1: {
        summary: 'Example plan nutrition',
        value: {
          name: 'Weight Loss Plan',
          description: 'A plan designed to help you lose weight',
          duration: 30,
          meals: [
            { name: 'Breakfast', items: ['Oatmeal', 'Fruit'] },
            { name: 'Lunch', items: ['Grilled Chicken', 'Salad'] },
            { name: 'Dinner', items: ['Fish', 'Vegetables'] },
          ],
          adherentId: '60d0fe4f5311236168a109cb',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'The created plan nutrition', type: PlanNutrition })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(
    @Body(ValidationPipe)
    createPlanNutritionDto: CreatePlanNutritionDto,
  ) {
    return this.plansNutritionService.create(createPlanNutritionDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing plan nutrition' })
  @ApiParam({ name: 'id', description: 'ID of the plan nutrition to update', type: String, example: '60d0fe4f5311236168a109ca' })
  @ApiBody({
    description: 'Updated data for the plan nutrition',
    type: UpdatePlanNutritionDto,
    examples: {
      example1: {
        summary: 'Example update',
        value: {
          name: 'Updated Weight Loss Plan',
          description: 'An updated plan designed to help you lose weight',
          duration: 45,
          meals: [
            { name: 'Breakfast', items: ['Smoothie', 'Fruit'] },
            { name: 'Lunch', items: ['Grilled Chicken', 'Quinoa'] },
            { name: 'Dinner', items: ['Fish', 'Vegetables'] },
          ],
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'The updated plan nutrition', type: PlanNutrition })
  @ApiResponse({ status: 404, description: 'Plan nutrition not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe)
    updatePlanNutritionDto: UpdatePlanNutritionDto,
  ) {
    return this.plansNutritionService.update(id, updatePlanNutritionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a plan nutrition' })
  @ApiParam({ name: 'id', description: 'ID of the plan nutrition to delete', type: String, example: '60d0fe4f5311236168a109ca' })
  @ApiResponse({ status: 200, description: 'Plan nutrition deleted successfully' })
  @ApiResponse({ status: 404, description: 'Plan nutrition not found' })
  remove(@Param('id') id: string) {
    return this.plansNutritionService.remove(id);
  }

  @Get('adherent/:adherentId')
  @ApiOperation({ summary: 'Retrieve plans nutrition by adherent ID' })
  @ApiParam({ name: 'adherentId', description: 'ID of the adherent', type: String, example: '60d0fe4f5311236168a109cb' })
  @ApiResponse({ status: 200, description: 'List of plans nutrition by adherent', type: [PlanNutrition] })
  findByAdherent(@Param('adherentId') adherentId: string) {
    return this.plansNutritionService.findByAdherent(adherentId);
  }

  @Get('count')
  @ApiOperation({ summary: 'Count total number of plans nutrition' })
  @ApiResponse({ status: 200, description: 'Total number of plans nutrition' })
  countPlans() {
    return this.plansNutritionService.countPlans();
  }

  @Get('date-range')
  @ApiOperation({ summary: 'Retrieve plans nutrition by date range' })
  @ApiParam({ name: 'startDate', description: 'Start date', type: String, example: '2025-01-01' })
  @ApiParam({ name: 'endDate', description: 'End date', type: String, example: '2025-12-31' })
  @ApiResponse({ status: 200, description: 'List of plans nutrition by date range', type: [PlanNutrition] })
  findByDateRange(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    return this.plansNutritionService.findByDateRange(startDate, endDate);
  }
}