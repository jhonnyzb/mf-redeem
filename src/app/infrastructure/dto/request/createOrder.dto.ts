export interface CreateOrderDtoModel {
    acceptData: true
    acceptTermsAndConditions: true
    awards: AwardDto[]
    isMixedPayment: boolean
}
export interface AwardDto {
    awardId: number
    amount: number
    catalogueId: number | null
    mobileOperator: number | null
}
