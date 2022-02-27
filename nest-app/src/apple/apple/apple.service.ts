import { Injectable } from '@nestjs/common';

type Apple = { color: string, seedCount: number, placeOfOrigin: string };

@Injectable()
export class AppleService {

    apple: Apple = {
        color: 'red',
        seedCount: 10,
        placeOfOrigin: 'Hungary'
    }

    getApple(): Apple  {
        return this.apple;
    }
}
