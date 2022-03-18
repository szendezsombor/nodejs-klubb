import {Injectable, Logger} from '@nestjs/common';
import {Product} from "../interface/product.interface";
import * as fs from "fs";
import {productsRoot} from "../products.module";
import * as path from "path";

@Injectable()
export class ProductsService {
    private logger: Logger = new Logger();


    getAllProduct(limit: number, sort: number): Product[] {
        let products: Product[] = JSON.parse(fs.readFileSync(path.join(productsRoot, '/data/products.data.json'), 'utf8'));
        products = products.sort((p1: Product, p2: Product) => (p1.id - p2.id) * sort);
        products = products.slice(0, limit);
        return products;
    }

}
