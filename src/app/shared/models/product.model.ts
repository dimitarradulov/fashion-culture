export class Product {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public imagePath: string,
    public price: number,
    public createdAt: Date,
    public category?: string
  ) {}
}

export enum Categories {
  Sneakers = 'sneakers',
  Jackets = 'jackets',
  Hats = 'hats',
  Mens = 'mens',
  Womens = 'womens',
}
