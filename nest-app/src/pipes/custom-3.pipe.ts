import {PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Optional} from '@nestjs/common';
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";

@Injectable()
export class Custom3Pipe implements PipeTransform<any> { // any --> any

    async transform(value: any, { metatype }: ArgumentMetadata) {

        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            throw new BadRequestException('Validation failed');
        }
        return value;
    }

private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object]; // Constructor functionok
        return !types.includes(metatype); // Az alábbí típusokban benne van e.
    }
}
