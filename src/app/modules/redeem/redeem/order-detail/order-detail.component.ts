import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DialogParams } from "src/app/core/models/gtm-models/dialogParams.model";
import { GTMPurchase, GTMValueOfPurchase } from "src/app/core/models/gtm-models/gtmPurchase.model";
import { GTMSelectContent, GTMValueOfGTMSelectContent } from "src/app/core/models/gtm-models/gtmSelectContent.model";
import { CartUtil } from "src/app/utils/CartUtil";
import { ProgramUtil } from "src/app/utils/ProgramUtil";
import { Params, Utils } from 'src/app/utils/Utils';
import { ProgramDto } from "src/app/infrastructure/dto/response/programsResponse.dto";

import { ContactService } from "src/app/infrastructure/services/contact.service";

import { DialogService } from "src/app/infrastructure/services/dialog.service";

import { getSession, saveSession} from "src/app/core/encryptData";
import { MixedPaymentValueResponseDto } from "src/app/infrastructure/dto/response/mixedPaymentValueResponse.dto";
import { OrderService } from "src/app/infrastructure/services/order.service";
import { LoginValeproResponseModel } from "src/app/core/models/response/loginValeproResponse.model";
import { PersonDataResponseModel } from "src/app/core/models/response/personDataResponse.model";
import { CartModel } from "src/app/core/models/cart.model";
import { OrderRepository } from "src/app/core/repositories/order.repository";
import { AwardRequestModel, CreateOrderRequestModel } from "src/app/core/models/request/createOrder.model";
import { ResponseBase } from "src/app/core/models/responseBase.model";
import { ErrorResponseModel } from "src/app/core/models/responseError.model";
import { AddressRepository } from "src/app/core/repositories/address.repository";
import { AdressResponseModel, ConsultAddressResponseModel } from "src/app/core/models/response/ConsultAddress.model";
import { ParameterModel } from "src/app/core/models/response/parametersResponse.model";
import { UserRepository } from "src/app/core/repositories/user.respository";
import { CreateOrderResponseModel } from "src/app/core/models/response/createOrderREsponse.model";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.scss"],
})
export class OrderDetailComponent implements OnInit {
  totalPoints = 0;
  user: LoginValeproResponseModel = getSession<LoginValeproResponseModel>('accountValepro');
  address: any[] = [];
  listContacts: any[] = [];
  principalAddress: any = {};
  principalContact: any = {};
  isEnableButton: boolean = false;
  isCheckAddress: boolean = false;
  isCheckTerm: boolean = false;
  urlTermsAndConditios= getSession<ParameterModel>('TycRedemption');
  paramaters: Params = new Params();
  program!: ProgramDto;
  urlPrivacy: string = "";
  utils: Utils;
  isLoading: boolean = false;
  totalCop!: number;
  popupMessage!: string;
  userData: PersonDataResponseModel = getSession<PersonDataResponseModel>('userData');
  cart = getSession<CartModel[]>('wr-c-cart');
  mixPay = getSession<boolean>('mixPayment');
  awards: AwardRequestModel[] = [];
  mainAddress: AdressResponseModel;
  countryName: string;

  constructor(
    private dialogService: DialogService,
    private programUtil: ProgramUtil,
    private router: Router,
    private cartUtil: CartUtil,
    private orderRepository: OrderRepository,
    private addressRepository: AddressRepository,
    private userRepository: UserRepository
  ) {
    this.userData.person.neighborhoodResidence
  }

  async ngOnInit(): Promise<void> {
    //leo el carrito para pintar los detalles
    this.getAddress();
    if (this.cart.length > 0) {
      //calculamos total de puntos en el carrito
      this.cart.forEach((element) => {
        this.totalPoints = this.totalPoints + element.Quantity * element.Points;
      });
    }
  }


  
  getAddress() {
    this.addressRepository.getAddress().subscribe({
      next: (response: ResponseBase<ConsultAddressResponseModel>) => {
        this.mainAddress = response.data.Addresses.filter(address => address.Main == true)[0];
        this.countryName = response.data.countryName;
      },
      error: (error: ResponseBase<ErrorResponseModel[]>) => { 
        const params: DialogParams = {
          success: false,
          msg: undefined,
          page: undefined,
          confirmText: undefined
        };
        this.dialogService.openConfirmDialog(error.data[0].errorMessage, params);
      }
    });
  }

  goAddress() {
    this.sendGtmDataEdit();
    this.router.navigate([
      "/main/redeem/address"
    ]);

  }
  goContact() {
    this.router.navigate([
      "/main/account/detail-account"
    ]);

  }

  sendGtmDataEdit() {
    let valueMixPay = getSession<MixedPaymentValueResponseDto>('m-p-v');
    if (!valueMixPay) {
      valueMixPay = {
        AmmountToPay: 0,
        Points: this.cartUtil.calculateTotalPoints()
      }
    }
    let itemId: any = [];
    this.cart.forEach(product => {
      itemId.push(product.ProductId);
    });
    let value: GTMValueOfGTMSelectContent = {
      Dinero: valueMixPay.AmmountToPay,
      Puntos: valueMixPay.Points,
    };
    let tagData: GTMSelectContent = {
      event: "select_content",
      ParameterTarget: "Redención",
      ParameterLocation: "Redención",
      ParameterType: "Botón",
      ParameterCategory: "Redención",
      IDAccount: this.user.AccountId,
      UserName: this.user.UserName,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      ParameterText: "Editar Datos Pedido",
      ParameterItemID: "" + itemId,
      Currency: valueMixPay.AmmountToPay > 0 ? 'Mixto' : 'Puntos',
      value: JSON.stringify(value),
    };
    window.parent.postMessage(JSON.stringify(tagData), '*');
  }

  changeCheckbox() {
    this.isEnableButton = false;
    if (this.isCheckAddress && this.isCheckTerm) {
      this.isEnableButton = true;
    }
  }


  onContinue() {
      if (!this.isCheckAddress || !this.isCheckTerm) {
        let dialogParams: DialogParams = {
          success: false,
          msg: undefined,
          page: undefined,
          confirmText: ""
        };
        this.dialogService.openConfirmDialog("Aceptar terminos y condiciones ", dialogParams);
        return;
      }
      this.awards = this.cart.map(item => {
        return {
          awardId: item.AwardId,
          amount: item.Quantity,
          catalogueId: null,
          mobileOperator: item.mobileOperator
        };
      });
      let request: CreateOrderRequestModel = {
        acceptData: this.isCheckAddress,
        acceptTermsAndConditions: this.isCheckTerm,
        awards: this.awards,
        isMixedPayment: this.mixPay
      }
      this.orderRepository.createOrder(request).subscribe({
        next: (response: ResponseBase<CreateOrderResponseModel>) => {
          this.getUserData()
          this.cartUtil.numberOfCartItemsEvent(0);
          saveSession(response.data, 'dataMixPay')
          this.router.navigate(["/main/redeem/order-overview"]);
        },
        error: (error: ResponseBase<ErrorResponseModel>) => {
          const params: DialogParams = {
            success: false,
            msg: undefined,
            page: undefined,
            confirmText: 'Volver'
          };
          this.dialogService.openConfirmDialog(error.data[0].errorMessage, params);
        }
      })
  }



  sendGtmData(producto: any) {
    let itemsId: any = [];
    let valueMixPay = getSession<MixedPaymentValueResponseDto>('m-p-v');
    if (!valueMixPay) {
      valueMixPay = {
        AmmountToPay: 0,
        Points: this.cartUtil.calculateTotalPoints()
      }
    }
    producto.lstPremios.forEach((premio: any) => {
      itemsId.push(`${premio.IDPremio}:${premio.Cantidad}`);
    });
    let valor: GTMValueOfPurchase = {
      Dinero: valueMixPay.AmmountToPay,
      Puntos: valueMixPay.Points,
    };

    let tagData: GTMPurchase = {
      event: "purchase",
      ParameterTarget: "Redencion",
      ParameterLocation: "Redención",
      ParameterType: "Botón",
      ParameterCategory: "Redención",
      IDAccount: this.user.AccountId,
      UserName: this.user.UserName,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      TransactionId: producto.IDPedido,
      Quantity: producto.lstPremios.length,
      ItemsID: itemsId.join("|"),
      Currency: valueMixPay.AmmountToPay > 0 ? 'Mixto' : 'Puntos',
      valor: JSON.stringify(valor),
    };
    window.parent.postMessage(JSON.stringify(tagData), '*');
  }

  getProgram() {
    this.program = this.programUtil.getProgram();
    this.urlTermsAndConditios = this.program.URLTyCCatalogo;
    this.urlPrivacy = this.program.URLCondicionesProgramaApp;
  }
  tycRedemptions(){
    window.open(this.urlTermsAndConditios.ParameterValue, "_blank");
  }

  getUserData() {
    this.userRepository.getUserData(this.user.PersonId).subscribe({
      next: (response: ResponseBase<PersonDataResponseModel>) => {
        saveSession(response.data, 'userData')
        const miEvento = new CustomEvent('userDataEvent', { detail: response.data });
        document.dispatchEvent(miEvento);
      },
      error: (error: ResponseBase<ErrorResponseModel[]>) => {
        console.error(error.message);
      }
    })
  }
}
