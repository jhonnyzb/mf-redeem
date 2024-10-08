import { ErrorDto } from "./errorResponse.dto";

export interface MixedPaymentResponseDto {
  Errores: ErrorDto[];
  IDPedido: number;
  TotalPuntosPedido: number;
  IDCuenta: number;
  NuevoSaldo: number;
  CodigoQR: string;
  Estado: string;
  FechaPedido: Date;
  Observaciones: string;
  lstPremios: AwardListMixPaymentDto[];
  PagoMixto: PagoMixtoDto;
}

export interface AwardParams {
}

export interface AwardListMixPaymentDto {
  NroRegistro: number;
  IDCampana: number;
  IDCatalogo: number;
  IDPremio: number;
  Nombre: string;
  NombreCorto: string;
  Descripcion: string;
  IDCategoria: number;
  NumeroPiezas: number;
  IDEstado: number;
  Puntos: number;
  EsCombo: boolean;
  CantidadMinARedimir: number;
  AltaRotacion: boolean;
  ExcluirRedencion: boolean;
  RedimirCalendarioHabilitado: boolean;
  TotalRegs: number;
  lstCaracteristicas: any[];
  Error: ErrorDto;
  IDTipoPremio: number;
  IDClasePremio: number;
  ParametrosRedimir: any[];
  IDPersona: number;
  Cantidad: number;
  ParametrosPremio: AwardParams;
  TipoEntrega: number;
}

export interface DataMixedPaymentDto {
  merchantId: string;
  accountId: string;
  description: string;
  referenceCode: string;
  amount: string;
  tax: string;
  taxReturnBase: string;
  currency: string;
  signature: string;
  extra1: string;
  extra2: string;
  test: string;
  buyerEmail: string;
  payerMobilePhone: string;
  buyerFullName: string;
  payerFullName: string;
  payerDocument: string;
  responseUrl: string;
  confirmationUrl: string;
  redirecionAppUrl: string;
  shippingAddress: string;
  shippingCity: string;
  shippingCountry: string;
}

export interface ParametersMixPaymentDto {
  mensaje: string;
  url: string;
}

export interface PagoMixtoDto {
  datos: DataMixedPaymentDto;
  parametros: ParametersMixPaymentDto;
}


