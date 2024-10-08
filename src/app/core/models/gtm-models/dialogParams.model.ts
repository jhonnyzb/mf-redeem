export class DialogParams {
  constructor(
    public msg: any,
    public page: any = null,
    public success: boolean = true,
    public confirmText: string,
    public title?: string,
    public buttonNavigationText?: string,
    public buttonSecondNavigationText?: string,
    public aditionalText?: string
  ) {}
}
