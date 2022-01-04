import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {CastEnum} from "../cast.enum";

@Entity()
export class PlayerEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "enum", enum: CastEnum })
    cast: CastEnum;

    @Column({default: 'None'})
    name: string;

    // @Column("int", {array: true, nullable: true})
    // array: number[];

    @Column("simple-array")
    nickNames: string[];

    @Column()
    level: number;

    @Column()
    guild: string;
}
