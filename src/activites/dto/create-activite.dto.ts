import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateActiviteDto {
  @ApiProperty({ description: 'The ID of the activite' })
  @IsString()
  _id: string;

  @ApiProperty({ description: 'The ID of the user' })
  @IsString()
  utilisateur_id: string;

  @ApiProperty({ description: 'The type of the activite' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'The duration of the activite in minutes' })
  @IsNumber()
  duree: number;

  @ApiProperty({ description: 'The distance covered during the activite in kilometers' })
  @IsNumber()
  distance: number;

  @ApiProperty({ description: 'The calories burned during the activite' })
  @IsNumber()
  calories_brulees: number;

  @ApiProperty({ description: 'The date of the activite' })
  @IsDateString()
  date: string;
}