import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MinLength } from 'class-validator';

export class CreateMongoUserDto {
  @ApiProperty({ example: 'coachUser' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'securePassword123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'coach', enum: ['admin', 'coach', 'adherent'] })
  @IsEnum(['admin', 'coach', 'adherent'])
  role: 'admin' | 'coach' | 'adherent';
}
