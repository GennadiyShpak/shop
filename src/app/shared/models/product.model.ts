  export interface ProductModel {
    id: number,
    name: string,
    image: string,
    price: number,
    isAvailable: boolean,
    phoneInCart: number
  }

  export interface CartProductModel extends ProductModel {
    phoneInCart: number
  }
