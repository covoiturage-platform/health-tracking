import { Inject, Injectable, Logger } from '@nestjs/common';
import { Db } from 'mongodb';
import { CreateMongoUserDto } from './dto/create-mongo-user.dto';

@Injectable()
export class MongoUsersService {
  private readonly logger = new Logger(MongoUsersService.name);

  constructor(@Inject('MONGO_DB') private readonly db: Db) {}

  async createMongoUser(dto: CreateMongoUserDto) {
    const adminDb = this.db.admin();

    const roles = {
      admin: [
        { role: 'root', db: 'admin' },
      ],
      coach: [
        { role: 'read', db: 'health-tracking' }, 
        { role: 'readWrite', db: 'health-tracking', collection: 'activites' }
      ],
      adherent: [
        { role: 'read', db: 'health-tracking' }, 
        { role: 'readWrite', db: 'health-tracking', collection: 'adherents' }
      ],
    };

    try {
      await adminDb.command({
        createUser: dto.username,
        pwd: dto.password,
        roles: roles[dto.role] || [],
      });

      this.logger.log(`Utilisateur MongoDB ${dto.username} créé avec succès.`);
      return { message: 'Utilisateur MongoDB créé avec succès', username: dto.username };
    } catch (error) {
      this.logger.error(`Erreur lors de la création de l'utilisateur MongoDB : ${error.message}`);
      throw error;
    }
  }
}
