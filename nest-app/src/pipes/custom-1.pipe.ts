import {PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Optional} from '@nestjs/common';

@Injectable()
export class Custom1Pipe implements PipeTransform<any, any> { // any --> any

    transform(value: any, metadata: ArgumentMetadata) {
        // ArgumentMetadata.type (milyen helyről jön az adat?)
        // Param -> /5
        // Query -> ?id=5
        // Body -> { id: 5 }

        value = value + '$';

        // ArgumentMetadata.metatype
        // class leíró pl -> Alma, ha @Body() body: Alma-ként van leírva
        // https://stackoverflow.com/questions/59416229/what-is-a-metatype-in-nestjs

        // ArgumentMetadata.data
        // data -> id (az elnevezése az transformálandó propertynek)
        return {value, metadata};
    }
}
