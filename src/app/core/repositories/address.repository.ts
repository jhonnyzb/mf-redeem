import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseBase } from "../models/responseBase.model";
import { ConsultAddressResponseModel } from "../models/response/ConsultAddress.model";
import { CreateAddressRequestModel } from "../models/request/createAddressRequest.model";

@Injectable({
  providedIn: 'root'
})
export abstract class AddressRepository {

  // abstract getCountries(): Observable<any>;

  // abstract getCitiesAndDepartaments(objParams: any): Observable<any>;

  // abstract getCitiesAndDepartamentsNoCache(objParams: any): Observable<any>;

  // abstract getAddressTypes(objParams: any): Observable<any>;

  abstract getAddress(): Observable<ResponseBase<ConsultAddressResponseModel>>;
  abstract createAddress(request: CreateAddressRequestModel): Observable<ResponseBase<null>>
  abstract deleteAddress(id: number): Observable<ResponseBase<null>>
  abstract markAsMain(id: number): Observable<ResponseBase<null>> 
  // abstract removeAddress(address: any): Observable<any>;

  // abstract updateAddress(address: any): Observable<any>;

  // abstract insertAddress(address: any): Observable<any>;
}
