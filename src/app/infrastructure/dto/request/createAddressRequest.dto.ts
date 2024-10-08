
export interface CreateAddressRequestDto {
    DepartmentId: number
    CityId: number
    Neighborhood: string
    ResidenceAddress: string
    HousingType: Number
    Observations?: string
}