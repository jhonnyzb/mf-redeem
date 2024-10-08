import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { getSession } from "src/app/core/encryptData";
import { GTMSelectContent } from "src/app/core/models/gtm-models/gtmSelectContent.model";
import { CartUtil } from "src/app/utils/CartUtil";
import { UtilsTitle } from "src/app/utils/UtilsTitle";
import { ProductService } from "src/app/infrastructure/services/product.service";
import { LoginValeproResponseModel } from "src/app/core/models/response/loginValeproResponse.model";
import { CartModel } from "src/app/core/models/cart.model";


@Component({
  selector: "app-detail-cart",
  templateUrl: "./detail-cart.component.html",
  styleUrls: ["./detail-cart.component.scss"],
})
export class DetailCartComponent implements OnInit {
  product: any = {};
  user: LoginValeproResponseModel = getSession<LoginValeproResponseModel>('accountValepro');
  constructor(
    private productService: ProductService,
    private router: Router,
    private cartUtil: CartUtil,
    private utilsTitle: UtilsTitle
  ) {
    this.utilsTitle.suscribeRoutesTitle();
    this.user = getSession<LoginValeproResponseModel>('accountValepro');
  }

  ngOnInit(): void {
    this.product = this.productService.getSelectedProduct();
  }

  setProduct(product: any) {
    this.productService.setSelectedProduct(product);
  }

  goCart(product: any) {
    this.sendGtmDataCatalog(product);
    this.router.navigate(["/main/redeem/cart"]);
  }

  onRedeem() {
    this.router.navigate(["/main/redeem/order-detail"]);
  }

  sendGtmDataCatalog(product: any) {
    let itemList = getSession<CartModel[]>('wr-c-cart');
    let parameterItem: any = [];
    itemList.forEach(product  => {
      parameterItem.push(product.AwardId);
    });
    let tagData: GTMSelectContent = {
      event: "select_content",
      ParameterTarget: "Catálogo",
      ParameterLocation: "Premios",
      ParameterType: "Botón",
      ParameterCategory: "Ver carrito",
      IDAccount: this.user.AccountId,
      UserName: this.user.UserName,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      ParameterText: 'Ver carrito de compras',
      ParameterItemID: "" + parameterItem,
      Currency: "",
      value: ""
    };
    window.parent.postMessage(JSON.stringify(tagData), '*');
  }


}
