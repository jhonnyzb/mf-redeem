export class ReferentialTableResponseModel {
  constructor(
  public tableId: number,
  public languageId: number,
  public codeId: number,
  public textCode: string,
  public description1: string,
  public description2: string,
  public auxiliaryData1: string,
  public auxiliaryData2: string,
  public auxiliaryData3: string,
  public parameter: string,
  public active: boolean,
  public dateRegister: string,
  public dateUpdate: string,
  public personIdCreate: number,
  public personIdUpdate: number){}
}
