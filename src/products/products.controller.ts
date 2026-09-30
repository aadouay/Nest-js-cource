import {
    Body,
    Controller, 
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
} from "@nestjs/common";
import type { Request, Response } from 'express';
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
type ProductType = { id:number, title:string, price:number }


@Controller("api/products")
export class ProductsController {
    private products: ProductType[] = [
            {id : 1, title: 'book', price: 10},
            {id : 2, title: 'pen', price: 5},
            {id : 3, title: 'laptop', price: 400},
        ];

    // GET:  ~/api/products
    @Get()
    getAllProducts() {
        return this.products;
    }    

    // GET:  ~/api/products/:id
    @Get(":id")
    getSingleProducts(@Param("id") id: string) {
        const find_product = this.products.find(
            (product) => product.id === parseInt(id)
        );
        if(!find_product) 
                throw new NotFoundException('Product not found !');
        return find_product;
    }

    // POST: ~/api/products
    @Post()
    createNewProduct(@Body() body: CreateProductDto){
        const new_Product: ProductType = {
           id : this.products.length + 1,
           title : body.title,
           price : body.price
        }
        this.products.push(new_Product);
        return new_Product;
    }
    // PUT : ~/api/products/:id

    @Put(":id")
    updateProduct(@Param('id') id: string, @Body() Body: UpdateProductDto){
        // logic of update product based on the body json ...
        let find_product = this.products.find((p => p.id === parseInt(id)));
        if(!find_product) throw new NotFoundException('Product not found !');
        if(Body.title)
            find_product.title = Body.title;
        if(Body.price)
            find_product.price = Body.price;
        this.products[parseInt(id) - 1] = find_product;
        return find_product;
    }
    
    // DELETE: ~/api/product/:id
    @Delete(":id")
    deleteSingleProduct(@Param('id') id: string){
        const find_product = this.products.find((p => p.id === parseInt(id)));
        if(!find_product) throw new NotFoundException('Product not found !');

        this.products.splice(parseInt(id) - 1, 1);
        return find_product;
    }


}