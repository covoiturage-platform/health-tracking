import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdherentDto } from './dto/create-adherent.dto';
import { UpdateAdherentDto } from './dto/update-adherent.dto';

@Injectable()
export class AdherentsService {
  private adherents = [
    { id: 1, nom: 'Adherent 1', email: 'adherant@gmail.com', role: 'INTERNAL' },
    { id: 2, nom: 'Adherent 2', email: 'adherant@gmail.com', role: 'EXTERNAL' },
    {
      id: 3,
      nom: 'Adherent 3',
      email: 'adherant3@gamil.com',
      role: 'INTERNAL',
    },
  ];

  findAll(role?: 'INTERNAL' | 'EXTERNAL') {
    if (role) {
      const rolesArray = this.adherents.filter(
        (adherent) => adherent.role === role,
      );
      if (rolesArray.length === 0)
        throw new NotFoundException(`Adherent with role ${role} not found`);
      return rolesArray;
    }
    return this.adherents;
  }

  findOne(id: number) {
    const adherent = this.adherents.find((adherent) => adherent.id === id);
    if (!adherent)
      throw new NotFoundException(`Adherent with ID ${id} not found`);
    return adherent;
  }

  create(adherent: CreateAdherentDto) {
    this.adherents.push({
      id: this.adherents.length + 1,
      ...adherent,
    });
    return adherent;
  }

  update(id: number, adherentUpdate: UpdateAdherentDto) {
    const existingAdherent = this.adherents.find(
      (adherent) => adherent.id === id,
    );
    if (existingAdherent) {
      Object.assign(existingAdherent, adherentUpdate);
      return existingAdherent;
    }
    return null;
  }

  remove(id: number) {
    const adherentIndex = this.adherents.findIndex(
      (adherent) => adherent.id === id,
    );
    if (adherentIndex >= 0) {
      this.adherents.splice(adherentIndex, 1);
      return true;
    }
    return false;
  }
}
