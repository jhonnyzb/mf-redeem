export interface ConsultAddressResponseDto {
    countryId: number
    countryName: string
    addresses: AdressResponseDto[]
}
export interface AdressResponseDto {
    residenceAddressId: number
    departamentId: number
    departamentName: string
    cityId: number
    cityName: string
    neighborhood: string
    residenceAddress: string
    housingType: number
    main: boolean
    observations: string
    dateRegister: string
}
