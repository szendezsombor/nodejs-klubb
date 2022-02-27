import {Injectable, Scope} from "@nestjs/common";
import {Cat} from "./cat";

@Injectable({scope: Scope.REQUEST})
export class CatService {

    getCat(): Cat {
        return {
            name: 'cirmos',
            age: 7
        };
    }
}