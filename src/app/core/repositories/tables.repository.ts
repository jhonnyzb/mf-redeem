import { Observable } from "rxjs";
import { GenericListResponseModel } from "../models/tables/genericResponse.model";
import { ResponseBase } from "../models/responseBase.model";
import { ReferentialTableResponseModel } from "../models/tables/referentialTablesResponse.model";

export abstract class TableRepository{
  abstract getReferentialData(tableId: number, languageId: number): Observable<ResponseBase<GenericListResponseModel[]>>;
}
