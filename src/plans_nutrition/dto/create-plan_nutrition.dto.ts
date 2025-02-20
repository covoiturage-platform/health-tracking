import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreatePlanNutritionDto {
  @ApiProperty({ description: 'The name of the plan nutrition' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The description of the plan nutrition' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The calories of the plan nutrition' })
  @IsNumber()
  calories: number;

  @ApiProperty({ description: 'The type of the plan nutrition', required: false })
  @IsOptional()
  @IsString()
  type?: string;
}