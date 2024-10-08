export class CreateOrderRequestModel {
    constructor(
        public acceptData: true,
        public acceptTermsAndConditions: true,
        public awards: AwardRequestModel[],
        public isMixedPayment: boolean
    ){}
}
export class AwardRequestModel {
    constructor(
        public awardId: number,
        public amount: number,
        public catalogueId: number | null,
        public mobileOperator: number | null
    ){}
}
