export class PayUResquestModel {
    constructor(
        public merchantId: string,
        public accountId: string,
        public description: string,
        public referenceCode: string,
        public amount: string,
        public tax: string,
        public taxReturnBase: string,
        public currency: string,
        public extra1: string,
        public extra2: string,
        public extra3: string,
        public test: string,
        public buyerEmail: string,
        public buyerFullName: string,
        public payerMobilePhone: string,
        public payerFullName: string,
        public payerDocument: string,
        public responseUrl: string,
        public confirmationUrl: string,
        public urlPayu: string,
        public signature: string
    ) { }
}