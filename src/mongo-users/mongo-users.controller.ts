import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MongoUsersService } from './mongo-users.service';
import { CreateMongoUserDto } from './dto/create-mongo-user.dto';

@ApiTags('MongoDB Users')
@Controller('mongo-users')
export class MongoUsersController {
  constructor(private readonly mongoUsersService: MongoUsersService) {}

  @ApiOperation({ summary: 'Créer un utilisateur MongoDB avec un rôle spécifique' })
  @Post('create')
  async createMongoUser(@Body() createMongoUserDto: CreateMongoUserDto) {
    return this.mongoUsersService.createMongoUser(createMongoUserDto);
  }
}
