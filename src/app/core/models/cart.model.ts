export class CartModel {
    constructor(
      public  AwardId: number,
      public  LongName: string,
      public  ShortName: string,
      public  Description: string,
      public  Cost: number,
      public  Points: number,
      public  Observations: string,
      public  ProductClass: number,
      public  ImagePath: string,
      public  Quantity: number,
      public  OperatorPhoneId?: number,
    ) {}
  }