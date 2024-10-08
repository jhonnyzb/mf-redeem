export interface AwardTaxRequestDto {
    IDPremio: number;
    IDCatalogo: number;
    Cantidad: number;
    PuntosUnidad: number;
  }

  export interface AwardsTaxRequestDto {
    IDPunto: number;
    Premios: AwardTaxRequestDto[];
  }



