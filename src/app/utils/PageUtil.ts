
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { descrypt, encrypt } from './sesion-util';
import { TypeServicesResponseDto } from '../infrastructure/dto/response/typeServicesResponse.dto';





@Injectable({
  providedIn: 'root'
})
export class PageUtil {
  constructor() { }


  setSelectedServiceType(serviceTypeSelected: any) {
    sessionStorage.setItem("public-service-selected", encrypt(JSON.stringify(serviceTypeSelected), 'public-service-selected'));
  }

  getSelectedServiceType(): TypeServicesResponseDto {
    return descrypt(sessionStorage.getItem("public-service-selected") ?? '', 'public-service-selected') as TypeServicesResponseDto;
  }
}
