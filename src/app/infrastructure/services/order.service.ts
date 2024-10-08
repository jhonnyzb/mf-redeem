import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse,  HttpHeaders } from '@angular/common/http';
import { getSession } from 'src/app/core/encryptData';
import { EnvironmentModel } from 'src/app/core/models/environment.model';
import { CreateOrderRequestModel } from 'src/app/core/models/request/createOrder.model';
import { ResponseBase } from 'src/app/core/models/responseBase.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { OrderMapper } from 'src/app/core/mappers/order.maper';
import { environment } from 'src/environments/environment';
import { ErrorResponseModel } from 'src/app/core/models/responseError.model';
import { PersonDataResponseModel } from 'src/app/core/models/response/personDataResponse.model';
import { CalculateMixPayRequestModel } from 'src/app/core/models/request/calculateMixPay.model';
import { CalculateMixPayResponseModel } from 'src/app/core/models/response/calculateMixPayResponse.model';
import { CreateOrderResponseModel } from 'src/app/core/models/response/createOrderREsponse.model';

let options;

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private httpOptions: any;


  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  createOrder(data: CreateOrderRequestModel): Observable<ResponseBase<CreateOrderResponseModel>> {
    const request = OrderMapper.createFromDomainToApi(data);
    return this.http.post<ResponseBase<CreateOrderResponseModel>>(`${environment.apiValepro}/redemption-api/api/v1/Orders`, request)
      .pipe(
        map(response => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: response.data ? OrderMapper.createFromApiToDomain(response.data) : null 
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error)
          let errorResponse: ResponseBase<ErrorResponseModel[]> = {
            codeId: error.error.codeId,
            message: error.error.message,
            data: error.error.data
          }
          return throwError(() => errorResponse);
        }))
  }

  calculateMixPay(data: CalculateMixPayRequestModel): Observable<ResponseBase<CalculateMixPayResponseModel>> {
    const request = OrderMapper.calculateMixPayFromDomainToApi(data);
    return this.http.post<ResponseBase<null>>(`${environment.apiValepro}/redemption-api/api/v1/Orders/mix-payment-values`, request)
      .pipe(
        map(response => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: OrderMapper.calculateMixPayFromApiToDomain(response.data)
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error)
          let errorResponse: ResponseBase<ErrorResponseModel[]> = {
            codeId: error.error.codeId,
            message: error.error.message,
            data: error.error.data
          }
          return throwError(() => errorResponse);
        }))
  }
  

}
