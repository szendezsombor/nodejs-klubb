import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerEntity } from './entity/player.entity';
import { DeleteResult, Repository, Transaction } from 'typeorm';
import { Player } from './dto/player.interface';
import { from, Observable } from 'rxjs';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerEntity)
    private repository: Repository<PlayerEntity>,
  ) {}

  getAllPlayer(): Observable<PlayerEntity[]> {
    return from(this.repository.find());
  }

  getPlayer(id: string) {
    return this.repository.findOne(id);
  }

  // @Transaction()
  createPlayer(playerDTO: Player): Promise<PlayerEntity> {
    const player = new PlayerEntity();
    this.updateEntityProperties(player, playerDTO);
    return this.repository.save(player);
  }

  async updatePlayer(playerDTO: Player): Promise<PlayerEntity> {
    const player: PlayerEntity = await this.repository.findOne(playerDTO.id);
    this.updateEntityProperties(player, playerDTO);
    return this.repository.save(player);
  }

  updateEntityProperties(player: PlayerEntity, playerDTO: Player) {
    player.cast = playerDTO.cast;
    player.name = playerDTO.name;
    player.nickNames = playerDTO.nickNames;
    player.level = playerDTO.level;
    player.guild = playerDTO.guild;
  }

  deletePlayer(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
