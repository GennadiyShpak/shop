import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import { CartAPI } from "../interfaces/cart.config";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { CartProductModel, ProductModel } from "src/app/shared/models";

@Injectable({
    providedIn: 'any'
})

export class CartObservableService {
    constructor(
        private http: HttpClient,
        @Inject(CartAPI) private cartURL: string
    ) {}
    
    getProducts(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(this.cartURL).pipe(
            map(productList => {
                const cartList = [];
                for (let i = 0; i < productList.length; i += 1) {
                  if(productList[i].phoneInCart) {
                    cartList.push(productList[i])
                  }
                }
                return cartList;
              }),
            catchError(this.handleError)
        )
    }

    getProduct(id: number): Observable<ProductModel> {
        const url = `${this.cartURL}/${id}`;
        return this.http.get<CartProductModel>(url).pipe(
            catchError(this.handleError)
        )
    }

    addProductToCart(product: ProductModel): Observable<ProductModel> {
        
        const url = `${this.cartURL}/${product.id}`
        product = {...product, phoneInCart:1 }
        return this.http.put<ProductModel>(url, product).pipe(
            catchError(this.handleError)
        )
    }

    incrementProductInCart(product: ProductModel): Observable<ProductModel> {
        const url = `${this.cartURL}/${product.id}`;
        const phoneInCart = product.phoneInCart + 1;
        product = {...product, phoneInCart}
        return this.http.put<ProductModel>(url, product).pipe(
            catchError(this.handleError)
        )
    }

    decrementProductInCart(product: ProductModel): Observable<ProductModel> {
        const url = `${this.cartURL}/${product.id}`;
        const phoneInCart = product.phoneInCart - 1;
        product = {...product, phoneInCart}
        return this.http.put<ProductModel>(url, product).pipe(
            catchError(this.handleError)
        )
    }

    removeProductFromCart(product: ProductModel): Observable<ProductModel> {
        const url = `${this.cartURL}/${product.id}`;
        const phoneInCart = 0;
        product = {...product, phoneInCart};
        return this.http.put<ProductModel>(url, product).pipe(
            catchError(this.handleError)
        );
    }

    clearCart() {
        return this.getProducts().pipe(
            tap((productList: ProductModel[]) => { this.removePhones(productList) })
        )
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          console.error('An error occurred:', error.error);
        } else {
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    private removePhones(phoneList: ProductModel[]) {
        phoneList.map(phone => {
            const url = `${this.cartURL}/${phone.id}`
            phone.phoneInCart = 0;
            this.http.put(url, phone).subscribe();
        })
    }      
}