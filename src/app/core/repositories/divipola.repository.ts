import { Observable } from 'rxjs';
import { ResponseBase } from '../models/responseBase.model';
import { DivipolaResponse } from '../models/tables/divipola.model';
export abstract class DivipolaRepository {
  abstract getCountry(languageId: number, isCurrent: number, onlyAssetsToBuildLoyalty: number): Observable<ResponseBase<DivipolaResponse[]>>;
  abstract getDepartment(languageId: number, countryCode: string): Observable<ResponseBase<DivipolaResponse[]>>;
  abstract getCities(languageId: number, countryCode: string, departmentCode: string): Observable<ResponseBase<DivipolaResponse[]>>;
}
