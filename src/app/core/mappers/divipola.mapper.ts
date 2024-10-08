import { DivipolaDTO } from "src/app/infrastructure/dto/tables/divipola.dto";
import { DivipolaResponse } from "../models/tables/divipola.model";

export class DivipolaMapper {
  static fromApiToDomain(dto: DivipolaDTO):  DivipolaResponse {
    return {
        codeId: dto.codeId,
        name: capitalizeString(dto.name)
    };
  }
}

function capitalizeString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
