import {CastEnum} from "../cast.enum";

export interface Player {
    id?: string;
    cast: CastEnum;
    name: string;
    nickNames: string[];
    level: number;
    guild: string;
}
