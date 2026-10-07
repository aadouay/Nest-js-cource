
type ProductType = { id:number, title:string, price:number }
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";

export class ProductService {
    private products: ProductType[] = [
            {id : 1, title: 'book', price: 10},
            {id : 2, title: 'pen', price: 5},
            {id : 3, title: 'laptop', price: 400},
    ];

    // get all product 

    getAll() {
        return this.products;
    }    

    // Get one product by id
    getOneBy(id: number) {
        const find_product = this.products.find(
            (product) => product.id === id
        );
        if(!find_product) return null;
        return find_product;
    }

    // create new product 
    createProduct({title, price}: CreateProductDto){
        const new_Product: ProductType = {
           id : this.products.length + 1,
           title : title,
           price : price
        }
        this.products.push(new_Product);
        return new_Product;
    }

    // update product
    updateProduct(id: number, {title, price}: UpdateProductDto){
        let find_product = this.products.find((p => p.id === id));
        if(!find_product) return null;
        if(title !== undefined)
            find_product.title = title;
        if(price !== undefined)
            find_product.price = price;
        // this.products[id - 1] = find_product;
        return find_product;
    }
    
    // dellet product
    deleteSingleProduct(id: number){
        const find_product = this.products.find((p => p.id === id));
        if(!find_product) return null;

        this.products.splice(id - 1, 1);
        return find_product;
    }
}