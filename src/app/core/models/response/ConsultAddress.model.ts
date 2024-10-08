export class ConsultAddressResponseModel {
    constructor(
        public countryId: number,
        public countryName: string,
        public Addresses: AdressResponseModel[]
    ){}
}
export class AdressResponseModel {
    constructor(
        public ResidenceAddressId: number,
        public DepartamentId: number,
        public DepartamentName: string,
        public CityId: number,
        public CityName: string,
        public Neighborhood: string,
        public ResidenceAddress: string,
        public HousingType: number,
        public Main: boolean,
        public Observations: string,
        public DateRegister: string
    ){}
}
