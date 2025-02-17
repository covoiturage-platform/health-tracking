import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateAdherentDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsEmail()
  email: string;
  
  @IsEnum(['INTERNAL', 'EXTERNAL'], {
    message: 'Role must be either INTERNAL or EXTERNAL',
  })
  role: 'INTERNAL' | 'EXTERNAL';
}
