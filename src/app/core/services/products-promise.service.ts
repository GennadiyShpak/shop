import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from "rxjs";
import { ProductModel } from "src/app/shared/models";

@Injectable({
    providedIn: 'any'
})

export class ProductsPromiseService {
    private readonly productsURL = 'http://localhost:4444/products'
    
    constructor(
        private http: HttpClient
    ) {}

    getProducts():Promise<ProductModel[]> {
        const productList$ = this.http.get(this.productsURL);
        return firstValueFrom(productList$)
        .then(res => res)
        .catch(this.handleError);
    }

    getProduct(id: number): Promise<ProductModel> {
        const productURL = `${this.productsURL}/${id}`;
        const product$ = this.http.get(productURL);

        return firstValueFrom(product$)
        .then(product => product)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
     }
}