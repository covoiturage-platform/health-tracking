import { ApiProperty } from '@nestjs/swagger';

export class PlanNutrition {
  @ApiProperty({ description: 'The ID of the plan nutrition' })
  _id: string;

  @ApiProperty({ description: 'The ID of the adherent' })
  adherent_id: string;

  @ApiProperty({ description: 'The type of the regime' })
  type_regime: string;

  @ApiProperty({ description: 'The daily calories of the plan nutrition' })
  calories_journalieres: number;

  @ApiProperty({ description: 'The start date of the plan nutrition' })
  date_debut: string;

  @ApiProperty({ description: 'The end date of the plan nutrition' })
  date_fin: string;
}