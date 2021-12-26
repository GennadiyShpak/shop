export interface ProductModel {
    name: string,
    image: string,
    price: number,
    isAvailable: boolean
  }

  export interface CartProductModel extends ProductModel {
    phoneInCart: number
  }
  