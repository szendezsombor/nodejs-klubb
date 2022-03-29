import {Body, Controller, Delete, Get, HttpCode, Logger, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {Product} from "../interface/product.interface";
import {ProductsService} from "../service/products.service";
import {ProductsQuery} from "../interface/products-query.interface";

@Controller('products') // /products
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    // /products?limit=5&sort=asc
    @Get()
    getAllProduct(@Query() params: ProductsQuery): Product[] {
        const limit: number = parseInt(params.limit || '5');
        const sort: number = params.sort === 'desc' ? -1 : 1;
        return this.productsService.getAllProduct(limit, sort);
    }
    // /products/4
    @Get(':id')
    getProductById(@Param('id') id: string): Product {
        return this.productsService.getProductById(parseInt(id));
    }

    // /products
    @Post()
    @HttpCode(201)
    createProduct(@Body() product: Product): Product {
        return this.productsService.createProduct(product);
    }

    @Put(':id')
    // @HttpCode(200)
    updateProduct(@Param('id', ParseIntPipe) id: number, @Body() product: Product): Product {
        console.log(typeof id);
        return this.productsService.updateProduct(id, product);
    }

    @Delete(':id')
    // @HttpCode(200)
    deleteProduct(@Param('id', ParseIntPipe) id: number): boolean {
        return this.productsService.deleteProduct(id);
    }

}
