import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/infrastructure/services/dialog.service';


@Component({
  selector: 'lib-mat-confirm-dialog-buttons',
  templateUrl: './mat-confirm-dialog-buttons.component.html',
  styleUrls: ['./mat-confirm-dialog-buttons.component.scss']
})
export class MatConfirmDialogButtonsComponent {
  dialogIcon = "";
  confirmText = "";
  title = '';
  btn1_message = '';
  btn2_message = '';
  navLink = '';
  aditional? = '';
  buttonsBackwards = false;
  settlementId!: number;
  buttonClicked = false;



  //#region Injectables
  dialogService = inject(DialogService);
  router = inject(Router);
  //#endregion

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MatConfirmDialogButtonsComponent>,
    private toastrService: ToastrService
  ) {
    this.confirmText = data.confirmText;
    this.title = data.title;
    this.btn1_message = data.buttonNavigationText;
    this.btn2_message = data.buttonSecondNavigationText;
    this.navLink = data.navigation;
    this.aditional = data.aditional;
    this.dialogIcon = this.data.success ? "../../../assets/alert.png" : "../../../assets/check_ok.svg";
    this.buttonsBackwards = data.data;
    document.addEventListener('closePopUp', () => {
      if(dialogRef){
        this.dialogRef.close(false);
      }
    });
  }

  navigate() {
    this.router.navigate([this.navLink]);
  }
  navigate_btn2() {
    if (this.aditional) {
      this.router.navigate([this.aditional]);
    }
  }


  closeDialog(data: boolean) {
    if (this.buttonsBackwards && data) {
      this.dialogRef.close(true);
      return
    }
    this.dialogRef.close(false);
    this.navigate_btn2();

  }

  PopUpconfirm() {
      this.dialogRef.close(true);
    
  }
  PopUpconfirm2() {
    this.navigate();
    this.dialogRef.close(false);
  }

}
