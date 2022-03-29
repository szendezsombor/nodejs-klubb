import {HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import {Product} from "../interface/product.interface";
import * as fs from "fs";
import {productsRoot} from "../products.module";
import * as path from "path";

@Injectable()
export class ProductsService {
    private logger: Logger = new Logger();
    private products: Product[] = [];
    private idBase: number = 21;

    constructor() {
        this.products = JSON.parse(fs.readFileSync(path.join(productsRoot, '/data/products.data.json'), 'utf8'));
    }

    getAllProduct(limit: number, sort: number): Product[] {
        let products: Product[] = [...this.products];
        products = products.sort((p1: Product, p2: Product) => (p1.id - p2.id) * sort);
        products = products.slice(0, limit);
        return products;
    }

    getProductById(id: number): Product {
        return this.products.find((product: Product) => product.id === id) || {} as Product;
    }

    createProduct(product: Product): Product {
        product.id = this.idBase;
        this.idBase++;
        this.products.push(product);
        return product;
    }

    updateProduct(id: number, productUpdate: Product) {
        const product: Product | undefined = this.products.find((product: Product) => product.id === id);
        const productIndex: number = this.products.indexOf(product);
        if (productIndex < 0) throw new HttpException('Not Found222222', HttpStatus.NOT_FOUND);
        productUpdate.id = id;

        return this.products[productIndex] = productUpdate;
    }

    deleteProduct(id: number): boolean {
        const product: Product | undefined = this.products.find((product: Product) => product.id === id);
        const productIndex: number = this.products.indexOf(product);
        if (productIndex < 0) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        this.products.slice(productIndex, 1);
        return true;
    }
}
