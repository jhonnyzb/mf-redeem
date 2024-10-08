
import { AdressResponseDto, ConsultAddressResponseDto } from "src/app/infrastructure/dto/response/ConsultAddress.dto";
import { AdressResponseModel, ConsultAddressResponseModel } from "../models/response/ConsultAddress.model";
import { CreateAddressRequestModel } from "../models/request/createAddressRequest.model";
import { CreateAddressRequestDto } from "src/app/infrastructure/dto/request/createAddressRequest.dto";

export class AdressMapper {
    static consultAdressFromApiToDomain(dto: ConsultAddressResponseDto): ConsultAddressResponseModel {
        return {
            countryId: dto.countryId,
            countryName: dto.countryName,
            Addresses: AdressMapper.mapAdress(dto.addresses)

        }
    }
    static mapAdress(addresses: AdressResponseDto[]): AdressResponseModel[] {
        return addresses.map((address) => ({
            ResidenceAddressId: address.residenceAddressId,
            DepartamentId: address.departamentId,
            DepartamentName: address.departamentName,
            CityId: address.cityId,
            CityName: address.cityName,
            Neighborhood: address.neighborhood,
            ResidenceAddress: address.residenceAddress,
            HousingType: address.housingType,
            Main: address.main,
            Observations: address.observations,
            DateRegister: address.dateRegister,
        }));
    }
    static createAddressFromDomainToApi(model: CreateAddressRequestModel): CreateAddressRequestDto {
        return {
            DepartmentId: model.DepartmentId,
            CityId: model.CityId,
            Neighborhood: model.Neighborhood,
            ResidenceAddress: model.ResidenceAddress,
            HousingType: model.HousingType,
            Observations: model.Observations,
        }
    }
}
