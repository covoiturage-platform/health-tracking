import { ApiProperty } from '@nestjs/swagger';

export class Coach {
  @ApiProperty({ description: 'The ID of the coach' })
  id: string;

  @ApiProperty({ description: 'The name of the coach' })
  name: string;

  @ApiProperty({ description: 'The email of the coach' })
  email: string;

  @ApiProperty({ description: 'The phone number of the coach' })
  phone: string;

  @ApiProperty({ description: 'The specialization of the coach' })
  specialization: string;
}