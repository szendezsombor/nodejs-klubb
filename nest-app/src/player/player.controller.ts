import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Res} from "@nestjs/common";
import {Player} from "./dto/player.interface";
import {PlayerService} from "./player.service";
import {PlayerEntity} from "./entity/player.entity";
import {Observable} from "rxjs";
import {Response} from "express";
import {DeleteResult} from "typeorm";
import {from} from "rxjs";

@Controller('/players')
export class PlayerController {

    constructor(private playerService: PlayerService) {}

    @Get()
    getAllPlayer(): Observable<PlayerEntity[]> {
        return this.playerService.getAllPlayer();
    }

    @Get(':id')
    getPlayer(@Param('id') id: string) {
        return this.playerService.getPlayer(id);
    }

    @Post()
    @HttpCode(201)
    async createPlayer(@Body() player: Player, @Res() res: Response): Promise<void> {
        const newPlayer: PlayerEntity = await this.playerService.createPlayer(player);
        res.header('Location', newPlayer.id);
        res.send(player);
    }

    @Put(':id')
    updatePlayer(@Body() player: Player): Observable<PlayerEntity> {
        return from(this.playerService.updatePlayer(player));
        // Érdekes dolog, ha benne hagyjuk a @Res-t akkor addig nem ad választ ameddig a res.send meg nem hivodik
    }

    @Delete(':id')
    async deletePlayer(@Param('id') id: string): Promise<DeleteResult> {
        return this.playerService.deletePlayer(id);
    }
}
