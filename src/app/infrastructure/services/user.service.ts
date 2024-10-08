import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { UserRepository } from '../../core/repositories/user.respository';
import { PersonDataResponseModel } from 'src/app/core/models/response/personDataResponse.model';
import { UserMapper } from 'src/app/core/mappers/user.mappper';
import { ResponseBase } from 'src/app/core/models/responseBase.model';
import { ErrorResponseModel } from 'src/app/core/models/responseError.model';
import { environment } from 'src/environments/environment';





@Injectable({
  providedIn: "root",
})
export class UserService implements UserRepository {

  constructor(
    private http: HttpClient,
  ) { }

  getUserData(personId: number): Observable<ResponseBase<PersonDataResponseModel>> {
    return this.http.get<ResponseBase<PersonDataResponseModel>>(`${environment.apiValepro}/affiliations-api/api/v1/user/get-user-data?personId=${personId}`).
      pipe(
        map((response) => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: UserMapper.mapPersonDataResponseDtoToModel(response.data)
          }
        }),
        catchError((error: HttpErrorResponse) => {
          let errorResponse: ResponseBase<ErrorResponseModel[]> = {
            codeId: error.error.codeId,
            message: error.error.message,
            data: error.error.data
          }
          return throwError(() => errorResponse);
        })
      );
  }
}
