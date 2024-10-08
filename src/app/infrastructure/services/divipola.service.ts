import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ResponseBase } from 'src/app/core/models/responseBase.model';
import { DivipolaResponse } from 'src/app/core/models/tables/divipola.model';
import { DivipolaRepository } from 'src/app/core/repositories/divipola.repository';
import { environment } from 'src/environments/environment';
import { DivipolaDTO } from '../dto/tables/divipola.dto';
import { DivipolaMapper } from 'src/app/core/mappers/divipola.mapper';

@Injectable({
  providedIn: 'root'
})
export class DivipolaService implements DivipolaRepository {
  private baseUrl = '/transversal-api/api/v1/divipola';

  constructor(private http: HttpClient) { }

  getCountry(languageId: number, isCurrent: number, onlyAssetsToBuildLoyalty: number): Observable<ResponseBase<DivipolaResponse[]>> {
    const queryParams = `/get-countries?languageId=${languageId}&isCurrent=${isCurrent}&onlyAssetsToBuildLoyalty=${onlyAssetsToBuildLoyalty}`;
    return this.http.get<ResponseBase<DivipolaDTO[]>>(`${environment.apiValepro}${this.baseUrl}${queryParams}`).pipe(
      map(response => {
        return {
          codeId: response.codeId,
          message: response.message,
          data: response.data.map(data => {
            return DivipolaMapper.fromApiToDomain(data)
          })
        }
      })
    );
  }

  getDepartment(languageId: number, countryCode: string): Observable<ResponseBase<DivipolaResponse[]>> {
    const queryParams = `/get-departments?languageId=${languageId}&countryCode=${countryCode}`;
    return this.http.get<ResponseBase<DivipolaDTO[]>>(`${environment.apiValepro}${this.baseUrl}${queryParams}`).pipe(
      map(response => {
        return {
          codeId: response.codeId,
          message: response.message,
          data: response.data.map(data => {
            return DivipolaMapper.fromApiToDomain(data)
          })
        }
      })
    );;
  }

  getCities(languageId: number, countryCode: string, departmentCode: string): Observable<ResponseBase<DivipolaResponse[]>> {
    const queryParams = `/get-cities?languageId=${languageId}&countryCode=${countryCode}&departmentCode=${departmentCode}&regionCode=${null}`;
    return this.http.get<ResponseBase<DivipolaDTO[]>>(`${environment.apiValepro}${this.baseUrl}${queryParams}`).pipe(
      map(response => {
        return {
          codeId: response.codeId,
          message: response.message,
          data: response.data.map(data => {
            return DivipolaMapper.fromApiToDomain(data)
          })
        }
      })
    );;
  }

}
