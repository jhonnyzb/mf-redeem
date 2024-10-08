import { AffiliationResponseDto, AccountResponseDto, PersonResponseDto, PersonDataResponseDto } from 'src/app/infrastructure/dto/response/personDataResponse.dto';
import { AccountResponseModel, AffiliationResponseModel, PersonDataResponseModel, PersonResponseModel } from '../models/response/personDataResponse.model';


export class UserMapper {

  static mapAffiliationDtoToModel(dto: AffiliationResponseDto): AffiliationResponseModel {
    if (!dto) {
      return null;
    }

    return new AffiliationResponseModel(
      dto.affiliationId || 0,
      dto.agencyId || 0,
      dto.agencyName || '',
      dto.regionals || null,
      dto.affiliationDate || '',
      dto.desaffiliationDate || '',
      dto.affiliationClassId || 0,
      dto.affiliationClassName || '',
      dto.externalCode || ''
    );
  }

  static mapAccountDtoToModel(dto: AccountResponseDto): AccountResponseModel {
    if (!dto) {
      return null;
    }

    const affiliationModel = this.mapAffiliationDtoToModel(dto.affiliation);

    return new AccountResponseModel(
      dto.affiliationDate || '',
      dto.statusId || 0,
      dto.statusName || '',
      dto.statusDate || '',
      dto.desaffiliationDate || null,
      dto.observations || '',
      dto.clusterId || 0,
      dto.clusterName || '',
      dto.acceptHabeasData || false,
      dto.acceptTermsAndConditions || false,
      dto.dateAcceptTermsAndConditions || '',
      dto.fromPublicCreation || false,
      dto.pointsBalance || 0,
      dto.pointsIssued || 0,
      dto.pointName || '',
      affiliationModel
    );
  }

  static mapPersonDtoToModel(dto: PersonResponseDto): PersonResponseModel {
    if (!dto) {
      return null;
    }

    const accountModel = this.mapAccountDtoToModel(dto.account);

    return new PersonResponseModel(
      dto.personTypeId || 0,
      dto.personTypeName || '',
      dto.identificationTypeId || 0,
      dto.identificationTypeName || '',
      dto.identificationNumber || '',
      dto.verificationDigit || null,
      dto.names || '',
      dto.lastNames || '',
      dto.genderId || 0,
      dto.genderName || '',
      dto.civilStatusId || null,
      dto.civilStatusName || '',
      dto.typePhoneId1 || 0,
      dto.typePhoneName1 || '',
      dto.phone1 || '',
      dto.telephoneExtension1 || '',
      dto.typePhoneId2 || null,
      dto.typePhoneName2 || '',
      dto.phone2 || '',
      dto.telephoneExtension2 || '',
      dto.email || '',
      dto.stratumId || 0,
      dto.stratumName || '',
      dto.statusId || 0,
      dto.statusName || '',
      dto.fullName || '',
      dto.addressResidence || '',
      dto.neighborhoodResidence || '',
      dto.cityResidenceId || '',
      dto.cityResidenceName || '',
      dto.stateProvinceResidenceId || '',
      dto.stateProvinceResidenceName || '',
      dto.countryResidenceId || 0,
      dto.countryResidenceName || '',
      accountModel
    );
  }

  static mapPersonDataResponseDtoToModel(dto: PersonDataResponseDto): PersonDataResponseModel {
    if (!dto) {
      return null;
    }

    const personModel = this.mapPersonDtoToModel(dto.person);

    return new PersonDataResponseModel(
      dto.personId || 0,
      dto.accountId || 0,
      dto.programId || 0,
      personModel
    );
  }



}
