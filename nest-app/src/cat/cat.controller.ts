import {Controller, Get, HostParam, Next, Res } from '@nestjs/common';
import {Response} from 'express';
import {from, of} from "rxjs";

@Controller('cat')
export class CatController {

    // @Get()
    // a1(@Res() res: Response) {
    //     res.status(200).json({});
    //     return {};
    // }

    @Get()
    hello(@Next() next: Function, @HostParam() hostparam: any): any {
        console.log('Hello')
        // console.log(hostparam)
        // return hostparam;
        if (true) next();
        else return "Hello"
        // TODO: next() esetleg efutás darabolására?
    }

    @Get()
    world() {
        console.log('World');
        return from(new Promise((resolve, reject) => resolve("World")));
    }

}
