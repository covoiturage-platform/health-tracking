import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreatePlanNutritionDto {
  @ApiProperty({ description: 'The ID of the adherent' })
  @IsString()
  adherent_id: string;

  @ApiProperty({ description: 'The type of the regime' })
  @IsString()
  type_regime: string;

  @ApiProperty({ description: 'The daily calories of the plan nutrition' })
  @IsNumber()
  calories_journalieres: number;

  @ApiProperty({ description: 'The start date of the plan nutrition' })
  @IsDateString()
  date_debut: string;

  @ApiProperty({ description: 'The end date of the plan nutrition' })
  @IsDateString()
  date_fin: string;
}