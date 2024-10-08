import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { getSession, saveSession } from "src/app/core/encryptData";
import { DialogParams } from "src/app/core/models/gtm-models/dialogParams.model";
import { GTMSelectContent } from "src/app/core/models/gtm-models/gtmSelectContent.model";
import { GTMItemOfSelectItem, GTMSelectItem } from "src/app/core/models/gtm-models/gtmSelectItem.model";
import { LoginValeproResponseModel } from "src/app/core/models/response/loginValeproResponse.model";
import { DialogService } from "src/app/infrastructure/services/dialog.service";
import { CartUtil } from "src/app/utils/CartUtil";



@Component({
  selector: "app-feature-articles",
  templateUrl: "./feature-articles.component.html",
  styleUrls: ["./feature-articles.component.scss"],
})
export class FeatureArticlesComponent {

  @Input() listFeaturedArticles: any[] = [];
  isSlideMoving: boolean = false;

  config = {
    variableWidth: true,
    slidesToScroll: 2,
    infinite: true,
    arrows: false,
    firstMobile: true,
  };
  user: LoginValeproResponseModel;


  constructor(
    private router: Router,
    private dialogService: DialogService,
    private cartUtil: CartUtil
  ) {
    this.user = getSession<LoginValeproResponseModel>('accountValepro');
  }

  goCatalogs() {
    this.gtmDataCatalog();
    this.router.navigate(["/main/catalog"]);
  }

  gtmDataCatalog() {
    let tagData: GTMSelectContent = {
      event: "select_content",
      IDAccount: this.user.AccountId,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      UserName: this.user.UserName,
      ParameterTarget: "Home",
      ParameterLocation: "Art. Destacados",
      ParameterType: "Botón",
      ParameterCategory: "Catálogo",
      ParameterText: "Articulos Destacados Ver Mas",
      ParameterItemID: "0",
      Currency: "",
      value: ""
    };
    window.parent.postMessage(JSON.stringify(tagData), '*');
  }



  onSelectProduct(product: any) {
    if(this.isSlideMoving){
      return;
    }
    saveSession( JSON.stringify(product), 'selectedProduct');
    this.router.navigate(["/main/catalog/detail"]);
    this.sendGtmProductDataItem(product);
  }

  openDialogNequiDaviplata(product: any): void {
    this.dialogService.openDialogFormNequiDaviplata(product)
      .afterClosed()
      .subscribe((res) => {
        if(res.IsValid) {
          this.sendGtmProductDataItem(product);
          this.cartUtil.addProduct(product, 1, "");
          this.dialogService.openConfirmDialog("Producto agregado al carrito");
        }
    });
  }

  addCart(product: any) {
    if(product.SolicitaConfirmacionDatos) {
      this.openDialogNequiDaviplata(product);
      return
    }
    if (this.containDataAdditional(product)) {
      this.openDialogProduct(product);
      return;
    }
    this.cartUtil.addProduct(product, 1, "");
    const params: DialogParams = {
      success: true,
      msg: undefined,
      page: undefined,
      confirmText: ''
    };
    this.dialogService.openConfirmDialog("Producto agregado al carrito", params);
  }

  openDialogProduct(product: any) {
    this.dialogService
      .openDialogProduct(product)
      .afterClosed()
      .subscribe((res) => {
        if (res.IsValid) {
          this.cartUtil.setVerificationForm(res.IsValid);
          saveSession( JSON.stringify(product), 'selectedProduct');
          this.router.navigate(["/main/catalog/detail"]);
          this.cartUtil.addProduct(
            product,
            1,
            this.formatVariblesRedemption(res.Data)
          );
          const params: DialogParams = {
            success: true,
            msg: undefined,
            page: undefined,
            confirmText: ''
          };
          this.dialogService.openConfirmDialog("Producto agregado al carrito", params);
        }
      });
  }

  formatVariblesRedemption(variablesForm: any){
    let data = "";
    for (const [key, value] of Object.entries(variablesForm)) {
      data += key + "_" + value + "$";
    }

    //quitar ultimo $
    data = data.slice(0, -1)

    return data;
  }

  containDataAdditional(product: any){
    let result = false;
    if(product.ParametrosRedimir != undefined
      && product.ParametrosRedimir != null
      && product.ParametrosRedimir.length > 0){
        result = true;
    }
    return result;
  }

  sendGtmProductDataItem(product: any) {
    let category = this.getProductCategory(product.IDCategoria);
    let item: GTMItemOfSelectItem = {
      Catalogo: product.IDCatalogo,
      Categoria: category ? category.Name : 'Categoría no encontrada',
      IDCategoria: product.IDCategoria,
      Id: product.IDPremio,
      Nombre: product.Nombre,
      Precio: product.Puntos,
      Referencia: ""
    };
    let tagData: GTMSelectItem = {
      event: "select_item",
      ParameterTarget: "Home",
      ParameterLocation: "Art. Destacados",
      ParameterType: "Img",
      ParameterCategory: "Catálogo",
      IDAccount: this.user.AccountId,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      UserName: this.user.UserName,
      item: JSON.stringify(item)
    };
    window.parent.postMessage(JSON.stringify(tagData), '*');
  }

  getProductCategory(IDCategoria: any){
    let categories = getSession<any>('categories');
    let categoryFound;
    if (categories != undefined && categories.length != 0) {
      categoryFound = this.getCategorieLocalById(
        IDCategoria
      );
    }
    return categoryFound;
  }

  getCategorieLocalById(categoryId: number) {
    let result: any = undefined;
    let categories = getSession<any>('categories');
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

  beforeChange() {
    this.isSlideMoving = true;
  }
  afterChange() {
    this.isSlideMoving = false;
  }
}
