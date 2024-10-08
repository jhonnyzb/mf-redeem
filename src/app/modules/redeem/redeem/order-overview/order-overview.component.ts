import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { getSession, saveSession } from "src/app/core/encryptData";
import { CartUtil } from "src/app/utils/CartUtil";
import { MixedPaymentValueResponseDto } from "src/app/infrastructure/dto/response/mixedPaymentValueResponse.dto";
import { PersonDataResponseModel } from "src/app/core/models/response/personDataResponse.model";
import { CartModel } from "src/app/core/models/cart.model";
import { CreateOrderResponseModel } from "src/app/core/models/response/createOrderREsponse.model";
import * as CryptoJS from 'crypto-js';
import { environment } from "src/environments/environment";
import { RemotePostService } from "src/app/infrastructure/services/remote-post.service";
import { PayUResquestModel } from "src/app/core/models/request/payURequest.model";

@Component({
  selector: "app-order-overview",
  templateUrl: "./order-overview.component.html",
  styleUrls: ["./order-overview.component.scss"],
})
export class OrderOverviewComponent implements OnInit {
  totalPoints = 0;
  amountPay = 0;
  totalCop!: number;
  cart: CartModel[] = [];
  userData: PersonDataResponseModel = getSession<PersonDataResponseModel>('userData');
  mixPayment = getSession<boolean>('mixPayment');
  dataMixPay = getSession<CreateOrderResponseModel>('dataMixPay');
  constructor(
    private cartUtil: CartUtil,
    private router: Router,
    private remotePostService: RemotePostService
  ) {
  }

  ngOnInit(): void {
    this.cart = getSession<CartModel[]>('wr-c-cart');
    this.cart.forEach((element) => {
      this.totalPoints = this.totalPoints + element.Quantity * element.Points;
    });
    if (this.cartUtil.isMixedPayment()) {
      let getMixed = getSession<MixedPaymentValueResponseDto>('m-p-v');
      if (!getMixed) {
        getMixed = {
          AmmountToPay: 0,
          Points: this.cartUtil.calculateTotalPoints()
        }
      }
      this.totalPoints = getMixed.Points;
      this.amountPay = getMixed.AmmountToPay;
    }

    //limpiar carrito
    saveSession([], 'wr-c-cart')
    this.cartUtil.clearMixPaymentChecked();
    this.cartUtil.clearMixPaymentValues();
  }

  goHome() {
    this.router.navigateByUrl("/main");
  }

  decrypt(cipherText: string, key: string, iv: string): string {
    const keyBytes = CryptoJS.enc.Utf8.parse(key);
    const ivBytes = CryptoJS.enc.Base64.parse(iv);
    const cipherTextBytes = CryptoJS.enc.Base64.parse(cipherText);

    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: cipherTextBytes },
      keyBytes,
      { iv: ivBytes, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  onSubmit() {
    let decryptedText = this.decrypt(this.dataMixPay.payment.data, environment.keyMixPay, this.dataMixPay.payment.signature)
    let data: PayUResquestModel = JSON.parse(decryptedText)
    const parametros: { [key: string]: string } = {
      MerchantId: data.merchantId,
      AccountId: data.accountId,
      Description: data.description,
      ReferenceCode: data.referenceCode,
      Amount: data.amount,
      Tax: data.tax,
      TaxReturnBase: data.taxReturnBase,
      Currency: data.currency,
      Extra1: data.extra1,
      Extra2: data.extra2,
      Extra3: data.extra3,
      Test: data.test,
      BuyerEmail: data.buyerEmail,
      BuyerFullName: data.buyerFullName,
      PayerMobilePhone: data.payerMobilePhone,
      PayerFullName: data.payerFullName,
      PayerDocument: data.payerDocument,
      ResponseUrl: data.responseUrl,
      ConfirmationUrl: data.confirmationUrl,
      UrlPayu: data.urlPayu,
      Signature: data.signature
    };
    this.remotePostService.submitPaymentForm(parametros);
  }
  
}


