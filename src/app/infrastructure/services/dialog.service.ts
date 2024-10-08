import { HostListener, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogModel } from "src/app/core/models/dialogModel";
import { DialogParams } from "src/app/core/models/gtm-models/dialogParams.model";
import { MatConfirmDialogComponent } from "src/app/modules/shared/mat-confirm-dialog/mat-confirm-dialog.component";
import { MatFormNequiDaviplataComponent } from "src/app/modules/shared/mat-form-nequi-daviplata/mat-form-nequi-daviplata.component";
import { MatFormProductComponent } from "src/app/modules/shared/mat-form-product/mat-form-product.component";
import { MatRedirectionDialogComponent } from "src/app/modules/shared/mat-redirection-dialog/mat-redirection-dialog.component";
import { CodeValidateDto } from "../dto/request/codeValidate.dto";
import { MatCodeGenerateComponent } from "src/app/modules/shared/mat-code-generate/mat-code-generate.component";
import { MatDialogIframeComponent } from "src/app/modules/shared/mat-dialog-iframe/mat-dialog-iframe.component";
import { MatAddressDialogComponent } from "src/app/modules/shared/mat-address-dialog/mat-address-dialog.component";
import { MatConfirmDialogButtonsComponent } from "src/app/modules/shared/mat-confirm-dialog-buttons/mat-confirm-dialog-buttons.component";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  anchoPagina!: number;
  isfilter?: boolean;
  size!: string;
  constructor(private dialog: MatDialog) {
    window.addEventListener('resize', this.actualizarAnchoPagina.bind(this));
  }

  actualizarAnchoPagina() {
    this.anchoPagina = window.innerWidth;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.anchoPagina = event.target.innerWidth;
    this.updateFilterState();
  }

  updateFilterState() {
    this.isfilter = this.anchoPagina < 768;
  }
  openConfirmDialog(msg: any, dialogParams?: DialogParams) {
    return this.dialog.open(MatConfirmDialogComponent, {
      width: 'auto',
      panelClass: 'confirm-dialog',
      disableClose: true,
      data: {
        message: msg,
        page: dialogParams?.page,
        confirmText: dialogParams?.confirmText,
        success: dialogParams?.success
      }
    });
  }

  openCodeGenerateDialog(codeValidate: CodeValidateDto) {
    return this.dialog.open(MatCodeGenerateComponent, {
      width: '600px',
      panelClass: 'dialog-popup-code',
      disableClose: true,
      data: codeValidate
    });
  }




  openRedirectDialog(data: DialogModel) {
    return this.dialog.open(MatRedirectionDialogComponent, {
      width: "auto",
      height: "auto",
      panelClass: "confirm-dialog",
      disableClose: true,
      data: data,
    });
  }

  openDialogProduct(product: any) {
    return this.dialog.open(MatFormProductComponent, {
      width: 'auto',
      panelClass: 'dialog-product',
      disableClose: true,
      data: product
    });
  }

  openDialogFormNequiDaviplata(product: any) {
    return this.dialog.open(MatFormNequiDaviplataComponent, {
      width: 'auto',
      panelClass: 'dialog-product',
      disableClose: true,
      data: product
    });
  }

  openDialogIframe(msg: any) {
    return this.dialog.open(MatDialogIframeComponent, {
      panelClass: 'dialog-iframe',
      disableClose: true,
      height: '507px',
      width: '887px',
      data: {
        message: msg
      }
    });
  }

  openDialogAddress(address: any) {
    return this.dialog.open(MatAddressDialogComponent, {
      width: '624px',
      height: this.isfilter ? '700px' : '525px',
      panelClass: 'dialog-product',
      disableClose: true,
      data: address
    });
  }

  openButtonDialog1(params: DialogParams) {
    return this.dialog.open(MatConfirmDialogButtonsComponent, {
      width: '700px',
      panelClass: 'dialog-popup-code',
      data: params
    });
  }

}
