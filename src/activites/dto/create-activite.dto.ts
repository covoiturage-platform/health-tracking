import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateActiviteDto {
  @ApiProperty({ description: 'The name of the activite' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The description of the activite' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The duration of the activite in minutes' })
  @IsNumber()
  duration: number;

  @ApiProperty({ description: 'The type of the activite', required: false })
  @IsOptional()
  @IsString()
  type?: string;
}