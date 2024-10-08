import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpCacheService } from "./httpcache.service";
import { getSession } from "src/app/core/encryptData";
import { EnvironmentModel } from "src/app/core/models/environment.model";


import { ProgramListModel } from "src/app/core/models/response/programList.model";
import { FormResponseDto } from "../dto/response/formResponse.dto";


@Injectable({
  providedIn: "root",
})
export class ConfigService {


  constructor(
    private http: HttpClient,
    private httpCache: HttpCacheService
  ) {
  }

  getDocumentTypes(programId: number) {
    return this.http.get(getSession<EnvironmentModel>('env').serverName  + "v1/configuraciones/tiposIdentificacion?idPrograma="+programId);
  }

  getForm(objParams: any) {
    const params = this.httpCache.objectToParams(objParams);
    return this.http.get<FormResponseDto>(getSession<EnvironmentModel>('env').serverName  + "v1/configuraciones/formulario" + params);
  }

  getDataByTable(objParams: any) {
    const params = this.httpCache.objectToParams(objParams);
    return this.http.get(getSession<EnvironmentModel>('env').serverName  + "v1/configuraciones/tablas" + params);
  }

  getIndicatives() {
    return this.http.get(getSession<EnvironmentModel>('env').serverName  + "v1/configuraciones/indicativosPais");
  }

  getFormNoAuth(formId: number, programId: number){
    return this.http.get<FormResponseDto>(getSession<EnvironmentModel>('env').serverName  + 'v1/configuraciones/formulario?formulario=' + formId + '&idPrograma=' + programId);
  }

  getConfigVisual(programId: number) {
    return this.http.get(`${getSession<EnvironmentModel>('env').serverName }v1/configuraciones/programa/${programId}/configvisual`)
  }

  getProgramByDomain() {
    return this.http.get<ProgramListModel>('assets/programs.json');
  }
}
