import {
    BadRequestException,
    Body,
    Controller, 
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from "@nestjs/common";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { ProductService } from "./products.service";
import { threadCpuUsage } from "process";


@Controller("api/products")
export class ProductsController {
    // create an object based on our class service that containe
    // all our logicale func

    // @Important note : this considered as a bad practice !
    private productService: ProductService = new ProductService();

    // GET:  ~/api/products
    @Get()
    getAllProducts() {
        return this.productService.getAll();
    }    

    // GET:  ~/api/products/:id
    @Get(":id")
    getSingleProducts(@Param("id", ParseIntPipe) id: number) {
        const product = this.productService.getOneBy(id);
        if(!product) throw new NotFoundException();
        return product;
    }

    // POST: ~/api/products
    @Post()
    createNewProduct(@Body() body: CreateProductDto){
        return this.productService.createProduct(body);
    }
    // PUT : ~/api/products/:id

    @Put(":id")
    updateProduct(@Param('id', ParseIntPipe) id: number, @Body() Body: UpdateProductDto){
        const product = this.productService.updateProduct(id, Body);
        if(!product) throw new NotFoundException();
        return product;
    }
    
    // DELETE: ~/api/product/:id
    @Delete(":id")
    deleteSingleProduct(@Param('id', ParseIntPipe) id: number){
        const product = this.productService.deleteSingleProduct(id);
        if(!product) throw new NotFoundException();
        return product;
    }
}