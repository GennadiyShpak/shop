export enum TYPE_OF_PRODUCT {
  SWEETNESS = 'Sweet product',
  FRUIT = 'Tasty fruit',
  VEGETABLE = 'Healthy vegetable',
}

export interface PRODUCT {
  name: string,
  description: string,
  price: number,
  category: TYPE_OF_PRODUCT,
  isAvailable: boolean,
}