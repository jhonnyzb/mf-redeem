import { Injectable } from '@angular/core';
import { descrypt, encrypt } from './sesion-util';
import { MixPaymentdDto } from '../infrastructure/dto/request/mixPayment.dto';
import { ProgramDto } from '../infrastructure/dto/response/programsResponse.dto';



@Injectable({
  providedIn: 'root'
})
export class ProgramUtil {
  constructor() {

  }


  getProgram(): ProgramDto {
    let program!: ProgramDto;
    if (sessionStorage.getItem('program')) {
      program = descrypt(sessionStorage.getItem('program') ?? '', 'program') as ProgramDto;
    }
    return program;
  }

  getLocalMixPayment(): MixPaymentdDto {
    let data!: MixPaymentdDto;
    if (sessionStorage.getItem('mp-data')) {
      data = descrypt(sessionStorage.getItem('mp-data') ?? '', 'mp-data') as MixPaymentdDto;
    }
    return data;
  }


}
