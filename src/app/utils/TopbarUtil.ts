import { Injectable } from "@angular/core";
import { descrypt, encrypt } from "./sesion-util";


@Injectable({
  providedIn: 'root'
})
export class TopbarUtil {

  constructor() {}

  
  getCategoriesLocal() {
    let result: any = [];
    if (sessionStorage.getItem("categories")) {
      result =  descrypt( sessionStorage.getItem("categories") ?? '','categories');
    }
    return result;
  }

  getCategorieLocalById(categoryId: number) {
    let result: any = undefined;
    let categories = this.getCategoriesLocal();
    if (categories.Data.length > 0) {
      categories.Data.forEach((category: any) => {
        if (category.CategoryId == categoryId) {
          result = category;
          return result;
        }
      });
    }
    return result;
  }

}
