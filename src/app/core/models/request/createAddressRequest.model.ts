
export class CreateAddressRequestModel {
    constructor(
        public DepartmentId: number,
        public CityId: number,
        public Neighborhood: string,
        public ResidenceAddress: string,
        public HousingType: Number,
        public Observations?: string,

    ){}
}