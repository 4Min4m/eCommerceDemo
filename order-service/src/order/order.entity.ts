export class Order {
    constructor(
      public id: string,
      public userId: string,
      public amount: number,
      public status: string = 'pending',
    ) {}
  }