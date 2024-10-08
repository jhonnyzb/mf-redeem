import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { getSession, saveSession } from "src/app/core/encryptData";
import { GTMSelectContent, GTMValueOfGTMSelectContent } from "src/app/core/models/gtm-models/gtmSelectContent.model";
import { CartUtil } from 'src/app/utils/CartUtil';
import { UtilsTitle } from "src/app/utils/UtilsTitle";
import { AwardTaxRequestDto, AwardsTaxRequestDto } from "src/app/infrastructure/dto/request/awardsTaxRequest.dto";
import { DataTaxResponseDto } from "src/app/infrastructure/dto/response/dataTaxResponse.dto";
import { MixedPaymentValueResponseDto } from "src/app/infrastructure/dto/response/mixedPaymentValueResponse.dto";
import { ProductService } from 'src/app/infrastructure/services/product.service';
import { DialogService } from "src/app/infrastructure/services/dialog.service";
import { DialogModel } from "src/app/core/models/dialogModel";
import { LoginValeproResponseModel } from "src/app/core/models/response/loginValeproResponse.model";
import { CartModel } from "src/app/core/models/cart.model";
import { ProgramsResponseModel } from "src/app/core/models/response/programByIdResponse.model";
import { OrderRepository } from "src/app/core/repositories/order.repository";
import { AwardMixPayRequestModel, CalculateMixPayRequestModel } from "src/app/core/models/request/calculateMixPay.model";
import { ResponseBase } from "src/app/core/models/responseBase.model";
import { ErrorResponseModel } from "src/app/core/models/responseError.model";
import { CalculateMixPayResponseModel } from "src/app/core/models/response/calculateMixPayResponse.model";


@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  cart: CartModel[] = [];
  mixPayment: boolean;
  mixPay: boolean = false;
  redeemByPoints: boolean;
  dataMixPay: CalculateMixPayResponseModel;
  textMixPay: string = "";
  totalPoints = 0;
  listProductAmountCart!: DataTaxResponseDto[];
  isValidlistProductAmmount!: boolean;
  isVisibleMixPayment = false;
  paginate: any;
  user: LoginValeproResponseModel = getSession<LoginValeproResponseModel>('accountValepro');
  programById = getSession<ProgramsResponseModel>('ProgramById')
  constructor(
    private router: Router,
    private dialogService: DialogService,
    private productService: ProductService,
    private cartUtil: CartUtil,
    private utilsTitle: UtilsTitle,
    private orderRepository: OrderRepository
  ) {
    this.cart = getSession<CartModel[]>('wr-c-cart') ? getSession<CartModel[]>('wr-c-cart') : [];
    this.redeem();
    this.mixPayment = this.programById.mixedPayment;
    this.paginate = {
      totalElements: this.cart.length,
      totalPages: Math.ceil(this.cart.length / 8),
      pageSize: 8,
      currentPage: 1,
      itemsCurrentForPage: Math.min(8, this.cart.length)
    }
    this.user = getSession<LoginValeproResponseModel>('accountValepro');
    this.utilsTitle.suscribeRoutesTitle();

  }

  ngOnInit(): void {
    this.totalPoints = this.cartUtil.calculateTotalPoints();
  }
  //paginador
  pageChanged(page: number) {
    this.paginate = {
      totalElements: this.cart.length,
      totalPages: Math.ceil(this.cart.length / 8),
      itemsCurrentForPage: 8,
      pageSize: 8,
      currentPage: page
    }
  }

  calculateMixPay(button?: boolean) {
    if (button) {
      this.mixPay = !this.mixPay
    }
    if (this.mixPayment && !this.redeemByPoints && this.mixPay) {
      let mixPay: AwardMixPayRequestModel[] = [];
      this.cart.forEach(c => {
        mixPay.push(
          new AwardMixPayRequestModel(
            c.AwardId,
            c.Quantity
          )
        )
      })
      let data: CalculateMixPayRequestModel = {
        awards: mixPay
      }
      this.orderRepository.calculateMixPay(data).subscribe({
        next: (data: ResponseBase<CalculateMixPayResponseModel>) => {
          this.dataMixPay = data.data;
          this.textMixPay = data.message;
        }
      });
    }
  }
  redeem() {
    this.redeemByPoints = this.cart.some(p => p.ProductClass === 1 || p.ProductClass === 2 || p.ProductClass === 6 || p.ProductClass === 3)
  }
  delete(product: any) {
    this.cartUtil.deleteProduct(product);
    this.cart = getSession<CartModel[]>('wr-c-cart');
    this.totalPoints = this.cartUtil.calculateTotalPoints();
    this.updateCart();
    this.pageChanged(1);
    this.redeem();
    this.calculateMixPay();
  }
  loadAwardsDataTax() {
    //Carga de valores en dinero de premios.
    let awardTaxList: AwardTaxRequestDto[] = [];
    this.cart.forEach((data: any) => {
      let award: AwardTaxRequestDto = {
        Cantidad: data.Amount,
        IDPremio: data.ProductId,
        IDCatalogo: data.CatalogId,
        PuntosUnidad: data.Points,
      };
      awardTaxList.push(award);
    });
    //Creacion de objeto de consulta de valores base.
    let awardsTax: AwardsTaxRequestDto = {
      IDPunto: 0,
      Premios: awardTaxList
    };
    //llamado de servicio de valores base de premios.
    this.productService.getValueProducts(awardsTax).subscribe({
      next: (data: DataTaxResponseDto[]) => {
        this.cartUtil.setProductList(data);
      },
      error: (err: any) => {
        this.cartUtil.setProductList([]);
        this.dialogService.openRedirectDialog(
          new DialogModel(
            false,
            '',
            false,
            '',
            true,
            err.error.Mensaje,
            true,
            "Aceptar",
            false,
            '',
            0,
            ''
          )
        );
      },
    });
  }

  updateCart() {
    this.cartUtil.saveCart(this.cart);
  }

  increment(product: CartModel) {
    product.Quantity++;
    this.updateCart();
    this.totalPoints = this.cartUtil.calculateTotalPoints();
    this.calculateMixPay();
  }

  decrement(product: CartModel) {
    if (product.Quantity == 1) {
      return
    }
    product.Quantity--;
    this.updateCart();
    this.totalPoints = this.cartUtil.calculateTotalPoints();
    this.calculateMixPay();
  }
  //se dirige a la vista detalle de pedido
  onImageError(item: { ImagePath: string }) {
    item.ImagePath = '../../../../assets/img/imageCatalog.png';
  }
  goOrder() {
    saveSession(this.mixPay, 'mixPayment')
    this.router.navigate([
      "/main/redeem/order-detail"
    ]);
  }
  sendGtmData() {
    let itemId: any = [];
    let valueMixPay = getSession<MixedPaymentValueResponseDto>('m-p-v');

    if (!valueMixPay || valueMixPay.AmmountToPay == 0) {
      this.updateCart();
      valueMixPay = {
        AmmountToPay: 0,
        Points: this.totalPoints
      }
    }

    let value: GTMValueOfGTMSelectContent = {
      Puntos: valueMixPay.Points,
      Dinero: valueMixPay.AmmountToPay,
    };

    let tagData: GTMSelectContent = {
      event: "select_content",
      ParameterTarget: "Carrito",
      ParameterLocation: "Carrito",
      ParameterType: "Botón",
      ParameterCategory: "Redención",
      IDAccount: this.user.AccountId,
      UserName: this.user.UserName,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      ParameterText: "Redimir Ahora",
      ParameterItemID: `${itemId}`,
      Currency: valueMixPay.AmmountToPay > 0 ? 'Mixto' : 'Puntos',
      value: JSON.stringify(value),
    };

    window.parent.postMessage(JSON.stringify(tagData), '*');
  }

  goCatalog() {
    this.router.navigateByUrl("/main/catalog");
  }
}
