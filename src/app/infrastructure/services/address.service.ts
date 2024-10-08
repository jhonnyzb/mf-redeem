import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpCacheService } from "./httpcache.service";
import { Observable, catchError, map, throwError } from "rxjs";
import { getSession } from "src/app/core/encryptData";
import { EnvironmentModel } from "src/app/core/models/environment.model";
import { AddressRepository } from "src/app/core/repositories/address.repository";
import { ResponseBase } from "src/app/core/models/responseBase.model";
import { ErrorResponseModel } from "src/app/core/models/responseError.model";
import { ConsultAddressResponseModel } from "src/app/core/models/response/ConsultAddress.model";
import { ConsultAddressResponseDto } from "../dto/response/ConsultAddress.dto";
import { AdressMapper } from "src/app/core/mappers/address.maper";
import { environment } from "src/environments/environment";
import { CreateAddressRequestModel } from "src/app/core/models/request/createAddressRequest.model";


@Injectable({
  providedIn: 'root'
})
export class AddressService implements AddressRepository {


  constructor(private http: HttpClient, private httpCache: HttpCacheService) {
  }

  getAddressTypes(objParams: any): Observable<any> {
    const params = this.httpCache.objectToParams(objParams);
    return this.http.get(getSession<EnvironmentModel>('env').serverName  + 'v1/direcciones/tipos' + params);
  }

  getAddress(): Observable<ResponseBase<ConsultAddressResponseModel>> {
    return this.http.get<ResponseBase<ConsultAddressResponseDto>>(`${environment.apiValepro}/redemption-api/api/v1/Address`)
      .pipe(
        map((result: ResponseBase<ConsultAddressResponseDto>) => ({
          codeId: result.codeId,
          message: result.message,
          data: AdressMapper.consultAdressFromApiToDomain(result.data)
        })),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          let errorResponse: ResponseBase<ErrorResponseModel[]> = {
            codeId: error.error.codeId,
            message: error.error.Message,
            data: error.error.Data
          };
          return throwError(() => errorResponse);
        })
      );
  }
  createAddress(request: CreateAddressRequestModel): Observable<ResponseBase<null>> {
    let body = AdressMapper.createAddressFromDomainToApi(request);
    return this.http.post<ResponseBase<null>>(`${environment.apiValepro}/redemption-api/api/v1/Address`, body)
      .pipe(
        map((result: ResponseBase<null>) => ({
          codeId: result.codeId,
          message: result.message,
          data: result.data
        })),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          let errorResponse: ResponseBase<ErrorResponseModel[]> = {
            codeId: error.error.codeId,
            message: error.error.Message,
            data: error.error.Data
          };
          return throwError(() => errorResponse);
        })
      );
  }
  
  deleteAddress(id: number): Observable<ResponseBase<null>> {
    return this.http.delete<ResponseBase<null>>(`${environment.apiValepro}/redemption-api/api/v1/Address?addressId=${id}`)
      .pipe(
        map((data: ResponseBase<null>) => ({
          codeId: data.codeId,
          message: data.message,
          data: data.data
        }
        )),
        catchError((error: HttpErrorResponse) => {
          let errorResponse: ResponseBase<ErrorResponseModel[]> = {
            codeId: error.error.codeId,
            message: error.error.Message,
            data: error.error.Data
          }
          return throwError(() => errorResponse);
        })
      );
  }
  markAsMain(id: number): Observable<ResponseBase<null>> {
    let request = { addressId: id };
    return this.http.put<ResponseBase<null>>(`${environment.apiValepro}/redemption-api/api/v1/Address/mark-as-main`, request)
      .pipe(
        map((data: ResponseBase<null>) => ({
          codeId: data.codeId,
          message: data.message,
          data: data.data
        }
        )),
        catchError((error: HttpErrorResponse) => {
          let errorResponse: ResponseBase<ErrorResponseModel[]> = {
            codeId: error.error.codeId,
            message: error.error.Message,
            data: error.error.Data
          }
          return throwError(() => errorResponse);
        })
      );
  }
  removeAddress(address: any): Observable<any> {
    return this.http.delete(getSession<EnvironmentModel>('env').serverName  + 'v1/direcciones', { body: { IDCuenta: address.IDCuenta, IDDireccion: address.IDDireccion } });
  }

  updateAddress(address: any): Observable<any> {
    return this.http.put(getSession<EnvironmentModel>('env').serverName  + 'v1/direcciones', address);
  }

  insertAddress(address: any): Observable<any> {
    return this.http.post(getSession<EnvironmentModel>('env').serverName  + 'v1/direcciones', address);
  }

}
