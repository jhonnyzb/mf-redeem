export class CalculateMixPayResponseModel {
    constructor(
        public totalValueInPoints: number,
        public totalValueInMoney: number,
        public currency: string
    ){}
}

