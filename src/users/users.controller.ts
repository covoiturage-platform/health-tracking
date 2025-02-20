import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a user with a specific role' })
  @ApiBody({
    description: 'Data for the new user',
    type: CreateUserDto,
    examples: {
      example1: {
        summary: 'Example user',
        value: {
          username: 'johndoe',
          password: 'password123',
          email: 'johndoe@example.com',
          role: 'user',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'The created user', type: User })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Retrieve user information' })
  @ApiParam({ name: 'username', description: 'Username of the user', type: String, example: 'johndoe' })
  @ApiResponse({ status: 200, description: 'The found user', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':username')
  async getUser(@Param('username') username: string) {
    return this.usersService.getUser(username);
  }
}