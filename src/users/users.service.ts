import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('MONGO_DB') private readonly db: Db) {}

  async createUser(dto: CreateUserDto) {
    const usersCollection = this.db.collection('users');

    const privileges = {
      admin: { access: 'full' },
      coach: { access: 'read-only', scope: ['adherents'], write: ['activites'] },
      adherent: { access: 'limited', read: ['self'], write: ['poids', 'objectifs'] },
    };

    await usersCollection.insertOne({ 
      username: dto.username, 
      role: dto.role, 
      privileges: privileges[dto.role] 
    });

    return { message: 'Utilisateur créé avec succès', username: dto.username, role: dto.role };
  }

  async getUser(username: string) {
    const usersCollection = this.db.collection('users');
    return await usersCollection.findOne({ username });
  }
}
