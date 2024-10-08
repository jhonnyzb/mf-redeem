import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getSession } from 'src/app/core/encryptData';
import { EnvironmentModel } from 'src/app/core/models/environment.model';
import { ValidateCodeRequestDto } from 'src/app/infrastructure/dto/response/validateCodeRequest.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassCodeService {

  private httpOptions: any;

  constructor(
    private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  generateCode(data: any):Observable<any> {
    return this.http.post(getSession<EnvironmentModel>('env').serverName + 'v1/authorize/generate', data, this.httpOptions);
  }

  validateCode(data: any ) {
    return this.http.post<ValidateCodeRequestDto>(getSession<EnvironmentModel>('env').serverName + 'v1/authorize/validate', data);
  }

}
