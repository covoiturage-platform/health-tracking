import { ApiProperty } from '@nestjs/swagger';

export class PlanNutrition {
  @ApiProperty({ description: 'The ID of the plan nutrition' })
  id: string;

  @ApiProperty({ description: 'The name of the plan nutrition' })
  name: string;

  @ApiProperty({ description: 'The description of the plan nutrition' })
  description: string;

  @ApiProperty({ description: 'The calories of the plan nutrition' })
  calories: number;

  @ApiProperty({ description: 'The type of the plan nutrition', required: false })
  type?: string;
}