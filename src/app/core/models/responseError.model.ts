export class ErrorResponseModel {
  constructor(
    public propertyName: string,
    public errorMessage: string,
    public attemptedValue: any,
    public customState: any,
    public severity: number,
    public errorCode: any,
    public formattedMessagePlaceholderValues: any
  ) { }
}
