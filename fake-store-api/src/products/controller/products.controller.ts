import {Controller, Get, Logger, Query} from '@nestjs/common';
import {Product} from "../interface/product.interface";
import {ProductsService} from "../service/products.service";
import {ProductsQuery} from "../interface/products-query.interface";

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    getAllProduct(@Query() params: ProductsQuery): Product[] {
        const limit: number = parseInt(params.limit || '5');
        const sort: number = params.sort === 'desc' ? -1 : 1;
        return this.productsService.getAllProduct(limit, sort);
    }
}
