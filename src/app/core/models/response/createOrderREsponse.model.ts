export class CreateOrderResponseModel {
    constructor(
        public orderId: number,
        public payment: PaymentModel | null
    ){}
}
export class PaymentModel {
    constructor(
        public data: string,
        public signature: string
    ){}
}
