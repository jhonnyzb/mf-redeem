export class DialogModel {
  isIcon: boolean;
  icon: string;
  isTitle: boolean;
  title: string;
  isMessage: boolean;
  message: string;
  isConfirmButton: boolean;
  confirmButtonText: string;
  isCancelButton: boolean;
  cancelButtonText: string;
  processAcceptButton: ProcessTypeDialog;
  urlNavigate: string;

  constructor(isIcon: boolean, icon: string, isTitle: boolean, title: string, isMessage: boolean, message: string, isConfirmButton: boolean,
    confirmButtonText: string, isCancelButton: boolean, cancelButtonText: string, processAcceptButton: ProcessTypeDialog, urlNavigate: string,) {
    this.isIcon = isIcon;
    this.icon = icon;
    this.isTitle = isTitle;
    this.title = title;
    this.isMessage = isMessage;
    this.message = message;
    this.isConfirmButton = isConfirmButton;
    this.confirmButtonText = confirmButtonText;
    this.isCancelButton = isCancelButton;
    this.cancelButtonText = cancelButtonText;
    this.processAcceptButton = processAcceptButton;
    this.urlNavigate = urlNavigate;
  }
}

export enum ProcessTypeDialog {
  none = 0,
  redirectToBrowser = 1,
  navigateToOtherPage = 2,
}
