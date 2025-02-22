import { ApiProperty } from '@nestjs/swagger';

export class Activite {
  @ApiProperty({ description: 'The ID of the activite' })
  _id: string;

  @ApiProperty({ description: 'The ID of the user' })
  utilisateur_id: string;

  @ApiProperty({ description: 'The type of the activite' })
  type: string;

  @ApiProperty({ description: 'The duration of the activite in minutes' })
  duree: number;

  @ApiProperty({ description: 'The distance covered during the activite in kilometers' })
  distance: number;

  @ApiProperty({ description: 'The calories burned during the activite' })
  calories_brulees: number;

  @ApiProperty({ description: 'The date of the activite' })
  date: string;
}