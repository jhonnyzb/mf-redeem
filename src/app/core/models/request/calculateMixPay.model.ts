export class CalculateMixPayRequestModel {
    constructor(
        public awards: AwardMixPayRequestModel[]
    ){}
}
export class AwardMixPayRequestModel {
    constructor(
        public awardId: number,
        public amount: number
    ){}
}
