import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  IsDateString,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongodb';

export enum ObjectifStatus {
  EN_COURS = 'En cours',
  ATTEINT = 'Atteint',
  NON_ATTEINT = 'Non atteint',
}
class ObjectifDto {
  @IsString()
  @IsOptional()
  _id: string;

  @IsString()
  type: string;

  @IsNumber()
  valeur_cible: number;

  @IsDateString()
  date_debut: string;

  @IsDateString()
  date_fin: string;

  @IsEnum(ObjectifStatus)
  statut: ObjectifStatus;
}

export class CreateAdherentDto {
  @IsString()
  @IsOptional()
  id: string | ObjectId;

  @IsString()
  nom: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  telephone: string;

  @IsDateString()
  @IsOptional()
  date_inscription: string;

  @IsNumber()
  age: number;

  @IsNumber()
  poids_actuel: number;

  @IsNumber()
  taille: number;

  @IsString()
  @IsNotEmpty()
  coach_id: string;

  @IsArray()
  @IsOptional()
  @Type(() => ObjectifDto)
  objectifs: ObjectifDto[];
}
