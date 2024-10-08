import { Observable } from "rxjs";
import { PersonDataResponseModel } from "../models/response/personDataResponse.model";
import { ResponseBase } from "../models/responseBase.model";

export abstract class UserRepository{
  abstract getUserData(personId: number): Observable<ResponseBase<PersonDataResponseModel>>
}
