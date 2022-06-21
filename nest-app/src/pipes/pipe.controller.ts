import {Body, Controller, Get, OnModuleInit, Param, ParseIntPipe, Post, UsePipes, ValidationPipe} from "@nestjs/common";
import {Custom1Pipe} from "./custom-1.pipe";
import {Custom2Pipe} from "./custom-2.pipe";
import {IsInt, IsString} from "class-validator";
import {Custom3Pipe} from "./custom-3.pipe";
const Joi = require('joi');

export class Alma {}
export const CatSchema = Joi.object({
    name: Joi.string(),
    age: Joi.number(),
})

// { name: 'miau', age: 12 }

export interface CatDTO {
    name: string;
    age: number;
}

export class Cat2DTO {
    @IsString()
    name: string;

    @IsInt()
    age: number;
}

@Controller('pipe')
export class PipeController implements OnModuleInit {
    onModuleInit(): any {
        console.log(ValidationPipe)
        debugger;
    }

    @Get('int/:id')
    getIntPipe(@Param('id', ParseIntPipe) id: number): string {
        return `Id: ${id}, type: ${typeof id}`;
    }

    @Get('custom-1/:id')
    getCustomPipe(@Param('id', Custom1Pipe) transformedData: any): any {
        return transformedData;
    }

    @Post('cat-validation-2') // /pipe/cat-validation-2
    @UsePipes(new Custom2Pipe(CatSchema))
    postValidate2(@Body() createCatDto: CatDTO) {
        return createCatDto;
    }

    @Post('cat-validation-3') // /pipe/cat-validation-3
    postValidate3(@Body(new Custom3Pipe()) createCatDto: Cat2DTO) {
        return createCatDto;
    }
}


