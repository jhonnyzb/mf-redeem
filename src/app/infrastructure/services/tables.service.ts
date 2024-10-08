
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableRepository } from 'src/app/core/repositories/tables.repository';
import { TablesMapper } from 'src/app/core/mappers/tables.mapper';
import { ResponseBase } from 'src/app/core/models/responseBase.model';
import { GenericListResponseModel } from 'src/app/core/models/tables/genericResponse.model';
import { environment } from 'src/environments/environment';
import { ReferentialTableResponseDto } from '../dto/tables/referentialTable.dto';
import { ReferentialTableRequestDto } from '../dto/tables/referentialTableRequest.dto';
@Injectable({
  providedIn: 'root'
})
export class TableService implements TableRepository {

  constructor(private http: HttpClient) { }


  getReferentialData(tableId: number, languageId: number): Observable<ResponseBase<GenericListResponseModel[]>>{
    let requestDto: ReferentialTableRequestDto = {
      languageId: languageId,
      tableId: tableId
    }
    return this.http.post<ResponseBase<ReferentialTableResponseDto[]>>(environment.apiValepro+'/transversal-api/api/v1/ReferenceTable/get-reference-tables', requestDto).pipe(map((data)=> {
      return {
        codeId: data.codeId,
        message: data.message,
        data: data.data.map((data)=> {return TablesMapper.referentialTablesApiToDomain(data)})
      }
    }))
  }

}
