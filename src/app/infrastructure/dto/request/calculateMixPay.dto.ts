export interface CalculateMixPayRequestDto {
    awards: AwardMixPayRequestDto[]
}
export interface AwardMixPayRequestDto {
    awardId: number
    amount: number
}
