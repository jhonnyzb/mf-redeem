import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenerateCodeResponseModel } from 'src/app/core/models/request/generateCodeRequest.model';
import { ResponseDto } from 'src/app/infrastructure/dto/response/responseDto.dto';
import { PassCodeService } from 'src/app/infrastructure/services/pass-code.service';

@Component({
  selector: 'app-mat-code-generate',
  templateUrl: './mat-code-generate.component.html',
  styleUrls: ['./mat-code-generate.component.scss']
})
export class MatCodeGenerateComponent implements OnInit {

  dialogIcon = "";
  confirmText = "";
  popupMessage!: string;
  success = false;
  showPopUp = false;



  constructor(
    public dialogRef: MatDialogRef<MatCodeGenerateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private passCodeService: PassCodeService,
  ) {
    this.dialogIcon = "../../../../assets/img/check-circle.svg";
  }

  ngOnInit(): void {

    this.passCodeService.generateCode(this.data).subscribe(
      {
        next: (result: ResponseDto<GenerateCodeResponseModel>) => {
          if (result.Code == 0) {
            this.success = true;
          }
          else {
            this.dialogIcon = "../../../../assets/img/Icon-material-error.svg";
          }
          this.popupMessage = result.Message;
          this.showPopUp = true;
        },
        error: (error: HttpErrorResponse) => {
          console.error(error.error.Message);
          this.dialogIcon = "../../../../assets/img/Icon-material-error.svg";
          this.popupMessage = error.error.Message;
          this.showPopUp = true;

        }
      }
    );

  }


  aceptar(): void {
    this.dialogRef.close(this.success);
  }

  closeDialog() {
    this.dialogRef.close(false);

  }
}
