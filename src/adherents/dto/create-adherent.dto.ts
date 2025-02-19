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
  _id?: string;

  @IsString()
  nom: string;

  @IsString()
  email: string;

  @IsString()
  telephone: string;

  @IsDateString()
  @IsOptional()
  date_inscription: string = new Date().toISOString();

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
  @Type(() => ObjectifDto)
  objectifs: ObjectifDto[];
}
