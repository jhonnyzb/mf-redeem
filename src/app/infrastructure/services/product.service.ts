import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpCacheService } from './httpcache.service';
import { EnvironmentModel } from 'src/app/core/models/environment.model';
import { getSession } from 'src/app/core/encryptData';
import { AwardsTaxRequestDto } from '../dto/request/awardsTaxRequest.dto';
import { DataTaxResponseDto } from '../dto/response/dataTaxResponse.dto';
import { descrypt, encrypt } from 'src/app/utils/sesion-util';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private httpCache: HttpCacheService) {
  }


  setSelectedProduct(product: any) {
    sessionStorage.setItem('selectedProduct', encrypt( JSON.stringify(product), 'selectedProduct'));
  }

  getSelectedProduct() {
    let result = undefined;
    let product :any = descrypt( sessionStorage.getItem('selectedProduct') ?? '', 'selectedProduct');
    if(product){
      result = product;
    }
    return result;
  }

  getFeaturedArticles(objParams: any){
    const params = this.httpCache.objectToParams(objParams);
    return this.http.get(getSession<EnvironmentModel>('env').serverName  + 'v2/catalogos/destacados'+params);
  }

  getValueProducts(data: AwardsTaxRequestDto){
    return this.http.post<DataTaxResponseDto[]>(getSession<EnvironmentModel>('env').serverName  + 'v1/pagos/premios', data);
  }

}
