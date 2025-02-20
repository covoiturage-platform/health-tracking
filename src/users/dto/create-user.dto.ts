import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'coach', enum: ['admin', 'coach', 'adherent'] })
  @IsEnum(['admin', 'coach', 'adherent'])
  role: 'admin' | 'coach' | 'adherent';
}
