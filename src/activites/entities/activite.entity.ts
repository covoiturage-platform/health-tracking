import { ApiProperty } from '@nestjs/swagger';

export class Activite {
  @ApiProperty({ description: 'The ID of the activite' })
  id: string;

  @ApiProperty({ description: 'The name of the activite' })
  name: string;

  @ApiProperty({ description: 'The description of the activite' })
  description: string;

  @ApiProperty({ description: 'The duration of the activite in minutes' })
  duration: number;

  @ApiProperty({ description: 'The type of the activite', required: false })
  type?: string;
}