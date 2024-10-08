import { Component } from "@angular/core";
import { MixPaymentdDto } from "src/app/infrastructure/dto/request/mixPayment.dto";
import { DataTaxResponseDto } from "src/app/infrastructure/dto/response/dataTaxResponse.dto";
import { CartUtil } from "src/app/utils/CartUtil";
import { ProgramUtil } from "src/app/utils/ProgramUtil";

@Component({
  selector: "app-mix-payment",
  templateUrl: "./mix-payment.component.html",
  styleUrls: ["./mix-payment.component.scss"],
})
export class MixPaymentComponent{
  //#region Variables
  mixPayment: MixPaymentdDto;
  isVisibleMixPayment = false;
  points: number= 0;
  minPoints = 0;
  maxPoints = 0;
  pointsSelected: number= 0;
  ammountSelected: number= 0;
  percentInMoney: number= 0;
  percentInPoints: number= 0;
  listProductAmount: DataTaxResponseDto[] = [];
  ammountSelectedInput: string = '';
  pointsSelectedInput: string = '';
  isPermited: boolean = false;
  //#endregion

  constructor(
    private programUtil: ProgramUtil,
    private cartUtil:CartUtil
  ) {
    //#region Datos iniciales
    this.mixPayment = this.programUtil.getLocalMixPayment();
    this.isVisibleMixPayment = this.mixPayment.PorcentajePagoEnPuntos < 1; //Cambiar
    this.isVisibleMixPayment = true;
    //#region Recarga en cambio de carrito
    if (this.isVisibleMixPayment) {
      document.addEventListener('productValueEvent', (eventData: any) => {
        this.listProductAmount = eventData.detail as DataTaxResponseDto[];
        this.points = this.cartUtil.calculateTotalPoints();
        this.loadDataMixPayment();
        this.calculateMoneyPay();
      });
    }
  }


  initValues(){
    this.points = this.cartUtil.calculateTotalPoints();
    this.loadDataMixPayment();
    this.calculateMoneyPay();
  }

  loadDataMixPayment() {
    //Carga inicial del slider.
    this.maxPoints = this.points;
    this.minPoints = parseFloat(
      (this.mixPayment.PorcentajePagoEnPuntos * this.points).toFixed(8)
    );
    this.pointsSelected = this.points;
    this.ammountSelected = 0;
  }

  calculateMoneyPay() {
    if (this.pointsSelected > this.maxPoints) {
      this.pointsSelected = this.maxPoints;
    }
    if (this.pointsSelected < this.minPoints) {
      this.pointsSelected = this.minPoints;
    }
    //Si la lista de valores de pago es 0 el minimo de puntos es el total de puntos
    if (this.listProductAmount.length == 0) {
      this.minPoints = this.points;
      this.pointsSelected = this.points;
      this.ammountSelected = 0;
      this.formatValueInput();
      this.cartUtil.mixedPaymentFlux(false);
      return;
    }

    //Puntos totales igual al 100% del slider, total pago dinero igual 0
    if (this.pointsSelected == this.points) {
      this.ammountSelected = 0;
      this.formatValueInput();
      this.cartUtil.mixedPaymentFlux(false);
      return;
    }

    //calculo de puntos y dinero base
    this.pointsSelected = Math.ceil(this.pointsSelected);
    let baseValue = 0;
    let percentPointsToRedeem = this.pointsSelected / this.points;
    let percentAmmountToPay = 1 - percentPointsToRedeem;

    //Calculo de valor base mas impuestos por cada producto
    this.listProductAmount.forEach((product: DataTaxResponseDto) => {
      product.ValorBase = parseInt(
        (product.SubTotalItem * percentAmmountToPay).toFixed(
          this.mixPayment.DecimalesPuntos
        )
      );
      product.ValorImpuesto = parseFloat(
        (product.ValorBase * product.PorcentajeImpuesto).toFixed(
          this.mixPayment.DecimalesPuntos
        )
      );
      product.Total = product.ValorBase + product.ValorImpuesto;
      baseValue += product.Total;
    });

    //Marca pago en pago mixto
    this.cartUtil.mixedPaymentFlux(true);

    //llamado a impuestos de comision
    this.taxComissionAddToPay(baseValue);
  }

  taxComissionAddToPay(baseValue: number) {
    //calculo de comision de pago e impuestos de comision.
    let tranValue = parseFloat(
      (
        baseValue * this.mixPayment.TasaComisionMedioPago +
        this.mixPayment.ValorFijoComisionMedioPago
      ).toFixed(this.mixPayment.DecimalesPuntos)
    );

    //Si valor de comision es menor al monto minimo envia el monto minimo.
    if (tranValue < this.mixPayment.ValorMinimoComisionMedioPago) {
      tranValue = this.mixPayment.ValorMinimoComisionMedioPago;
    }

    //calculo de impuestos sobre comision
    let taxTranValue = parseFloat(
      (tranValue * this.mixPayment.TasaImptoComisionMedioPago).toFixed(
        this.mixPayment.DecimalesPuntos
      )
    );

    //suma monto base + monto comision + impuestos comision
    this.ammountSelected = baseValue + tranValue + taxTranValue;
    this.formatValueInput();
  }

  formatValueInput() {
    //Formato a valores en los input
    this.pointsSelectedInput = this.pointsSelected.toLocaleString("en", {
      maximumFractionDigits: 0,
    });
    this.ammountSelectedInput = this.ammountSelected.toLocaleString("en", {
      maximumFractionDigits: 0,
    });
    this.cartUtil.mixedPaymentValues(
      this.ammountSelected,
      this.pointsSelected
    );
  }
}
