export interface PublicServiceReferenceRequestDto {
    IDPremio: number;
    Referencia: string;
    IDCuenta: number;
  }

  export interface PublicServiceReferenceResponseDto {
    CodigoProductoExterno: string;
    NumeroReferencia: string;
    DataExtra: string;
    ValorServicio: number;
    Mensaje: string;
    CodigoError: string;
    PuntosSolicitados: number;
    PuntosDisponibles: number;
    NombrePunto: string;
    IDCuenta: number;
    IDPremio: number;
    IDPersonaCuenta: number;
    IDPersonaAutenticada: number;
    IDCampana: number;
    IDCatalogo: number;
    IDPunto: number;
    IDPrograma: number;
    IDPedido: number;
    CodigoPago: string;
    IDTipoEquipoOrigen: number;
    IDClasePremio: number;
  }

  export interface PublicServiceDto {
    IDCatalogo: number;
    IDCampana: number;
    IDPunto: number;
    IDPrograma: number;
    IDPremio: number;
    NombreCorto: string;
    Descripcion: string;
    PermitePtosVariables: number;
    Puntos: number;
    IDClasePremio: number;
    Imagen: string;
    IDPais: number;
    IDMoneda: number;
    Valor: number;
    CodigoProductoExterno: string;
    IDProveedor: number;
  }

  export interface DataPayServiceDto {
    dataExtra: string;
    valor: number;
    operador: string;
    celular: string;
    iDCuenta: number;
    iDPremio: number;
    referencia: string;
}

export interface DataPayServiceResponseDto {
  CodigoProductoExterno: string;
  NumeroReferencia: string;
  DataExtra: string;
  ValorServicio: number;
  Mensaje: string;
  CodigoError: string;
  PuntosSolicitados: number;
  PuntosDisponibles: number;
  NombrePunto: string;
  IDCuenta: number;
  IDPremio: number;
  IDPersonaCuenta: number;
  IDPersonaAutenticada: number;
  IDCampana: number;
  IDCatalogo: number;
  IDPunto: number;
  NombreServicio: string;
  IDPrograma: number;
  IDPedido: number;
  CodigoPago: string;
  IDTipoEquipoOrigen: number;
  IDClasePremio: number;
}
