export interface CreateOrderResponseDto {
    orderId: number
    payment: PaymentDto | null
}
export interface PaymentDto {
    data: string
    signature: string
}
