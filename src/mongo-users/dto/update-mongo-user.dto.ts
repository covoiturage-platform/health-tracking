import { PartialType } from '@nestjs/swagger';
import { CreateMongoUserDto } from './create-mongo-user.dto';

export class UpdateMongoUserDto extends PartialType(CreateMongoUserDto) {}
