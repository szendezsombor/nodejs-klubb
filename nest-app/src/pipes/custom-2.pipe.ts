import {PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Optional} from '@nestjs/common';
import {ObjectSchema} from 'joi';

@Injectable()
export class Custom2Pipe implements PipeTransform<any, any> { // any --> any

    constructor(@Optional() private schema: ObjectSchema) { // CatSchema
    }

    transform(value: any, metadata: ArgumentMetadata) {
        // ArgumentMetadata.type (milyen helyről jön az adat?)
        // Param -> /5
        // Query -> ?id=5
        // Body -> { id: 5 }

        // ArgumentMetadata.type
        // class leíró pl -> Alma, ha @Body() body: Alma-ként van leírva
        // https://stackoverflow.com/questions/59416229/what-is-a-metatype-in-nestjs

        const { error } = this.schema.validate(value); // value eleget tesz e neki CatSchema
        if (error) {
            throw new BadRequestException(error);
        }

        // ArgumentMetadata.type
        // data -> id (az elnevezése az transformálandó propertynek)
        return {value, metadata};
    }
}
