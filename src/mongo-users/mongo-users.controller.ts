import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { MongoUsersService } from './mongo-users.service';
import { CreateMongoUserDto } from './dto/create-mongo-user.dto';
import { MongoUser } from './entities/mongo-user.entity';

@ApiTags('MongoDB Users')
@Controller('mongo-users')
export class MongoUsersController {
  constructor(private readonly mongoUsersService: MongoUsersService) {}

  @ApiOperation({ summary: 'Create a MongoDB user with a specific role' })
  @ApiBody({
    description: 'Data for the new MongoDB user',
    type: CreateMongoUserDto,
    examples: {
      example1: {
        summary: 'Example MongoDB user',
        value: {
          username: 'johndoe',
          password: 'password123',
          roles: ['readWrite', 'dbAdmin'],
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'The created MongoDB user', type: MongoUser })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post('create')
  async createMongoUser(@Body(ValidationPipe) createMongoUserDto: CreateMongoUserDto) {
    return this.mongoUsersService.createMongoUser(createMongoUserDto);
  }
}