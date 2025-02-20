import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum ObjectifStatus {
  EN_COURS = 'En cours',
  ATTEINT = 'Atteint',
  NON_ATTEINT = 'Non atteint',
}

class ObjectifDto {
  @ApiProperty({ description: 'The ID of the objectif' })
  @IsString()
  _id: string;

  @ApiProperty({ description: 'The type of the objectif' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'The target value of the objectif' })
  @IsNumber()
  valeur_cible: number;

  @ApiProperty({ description: 'The start date of the objectif' })
  @IsDateString()
  date_debut: string;

  @ApiProperty({ description: 'The end date of the objectif' })
  @IsDateString()
  date_fin: string;

  @ApiProperty({ description: 'The status of the objectif', enum: ObjectifStatus })
  @IsEnum(ObjectifStatus)
  statut: ObjectifStatus;
}

export class CreateAdherentDto {
  @ApiProperty({ description: 'The ID of the adherent' })
  @IsString()
  _id: string;

  @ApiProperty({ description: 'The name of the adherent' })
  @IsString()
  nom: string;

  @ApiProperty({ description: 'The email of the adherent' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'The phone number of the adherent' })
  @IsString()
  telephone: string;

  @ApiProperty({ description: 'The registration date of the adherent', required: false })
  @IsDateString()
  @IsOptional()
  date_inscription: string = new Date().toISOString();

  @ApiProperty({ description: 'The age of the adherent' })
  @IsNumber()
  age: number;

  @ApiProperty({ description: 'The current weight of the adherent' })
  @IsNumber()
  poids_actuel: number;

  @ApiProperty({ description: 'The height of the adherent' })
  @IsNumber()
  taille: number;

  @ApiProperty({ description: 'The ID of the coach' })
  @IsString()
  coach_id: string;

  @ApiProperty({ description: 'The list of objectifs', type: [ObjectifDto] })
  @IsArray()
  @Type(() => ObjectifDto)
  objectifs: ObjectifDto[];
}