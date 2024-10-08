import { ReferentialTableResponseDto } from "src/app/infrastructure/dto/tables/referentialTable.dto";
import { GenericListResponseModel } from "../models/tables/genericResponse.model";


export class TablesMapper{

  static referentialTablesApiToDomain(dto: ReferentialTableResponseDto): GenericListResponseModel {
    return {
      codeId: Number(dto.codeId),
      name: dto.description1
    }
  }

 
}
