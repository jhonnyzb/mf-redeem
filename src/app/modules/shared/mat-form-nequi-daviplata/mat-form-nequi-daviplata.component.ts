import { Component, Inject, Input } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";


import { descrypt } from "src/app/utils/sesion-util";

@Component({
  selector: "app-mat-form-nequi-daviplata",
  templateUrl: "./mat-form-nequi-daviplata.component.html",
  styleUrls: ["./mat-form-nequi-daviplata.component.scss"],
})
export class MatFormNequiDaviplataComponent {
 
  @Input() closePopup!: boolean;
  disableButton: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MatFormNequiDaviplataComponent>
  ) {}

  validateDataUser(data: any): string {
    if (data.ExpresionRegular && !new RegExp(data.ExpresionRegular).test(data.ValorDefault)) {
      this.disableButton = true;
      return "color-error";
    } else {
      return "terciary";
    }
  }

  closeDialog(close: boolean): void {
    let popupValidate = null
    if (sessionStorage.getItem('isValidatePopup')) {
      popupValidate = descrypt( sessionStorage.getItem('isValidatePopup') ?? '','isValidatePopup');
    }
    if(popupValidate === 'true' && close) {
      close = true;
      this.dialogRef.close({
        IsValid: close,
      });
    }
    this.dialogRef.close({
      IsValid: close,
    });
  }
}
