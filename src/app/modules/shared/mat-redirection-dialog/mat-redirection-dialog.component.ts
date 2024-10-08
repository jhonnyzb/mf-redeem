
import { Router } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, Inject, OnInit } from "@angular/core";
import { DialogModel, ProcessTypeDialog } from "src/app/core/models/dialogModel";
@Component({
  selector: "app-mat-redirection-dialog",
  templateUrl: "./mat-redirection-dialog.component.html",
  styleUrls: ["./mat-redirection-dialog.component.scss"],
})
export class MatRedirectionDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModel,
    public dialogRef: MatDialogRef<MatRedirectionDialogComponent>,
    private router: Router
  ) {
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  acceptButton(): void {
    let enumProcessType = ProcessTypeDialog;
    switch (this.data.processAcceptButton) {
      case enumProcessType.navigateToOtherPage:
        this.router.navigate([this.data.urlNavigate]);
        break;
      case enumProcessType.redirectToBrowser:
        window.open(this.data.urlNavigate, "_blank");
        break;
      case enumProcessType.none:
        break;
      default:
        break;
    }
    this.closeDialog();
  }
}
