import { ApiProperty } from '@nestjs/swagger';

export class Coach {
  @ApiProperty({ description: 'The ID of the coach' })
  _id: string;

  @ApiProperty({ description: 'The name of the coach' })
  nom: string;

  @ApiProperty({ description: 'The email of the coach' })
  email: string;

  @ApiProperty({ description: 'The phone number of the coach' })
  telephone: string;

  @ApiProperty({ description: 'The specialization of the coach' })
  specialite: string;

  @ApiProperty({ description: 'The list of adherents', type: [String] })
  adherents: string[];

  @ApiProperty({ description: 'The recruitment date of the coach' })
  date_recrutement: string;
}