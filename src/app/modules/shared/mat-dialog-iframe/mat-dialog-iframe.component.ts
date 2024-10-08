import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';



@Component({
  selector: 'app-mat-dialog-iframe',
  templateUrl: './mat-dialog-iframe.component.html',
  styleUrls: ['./mat-dialog-iframe.component.scss']
})
export class MatDialogIframeComponent implements OnInit {
  url: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef:MatDialogRef<MatDialogIframeComponent>,
    private router:Router,
    private domSanitizer: DomSanitizer
    ) {
     this.url = domSanitizer.bypassSecurityTrustResourceUrl(data.message)
    }

  ngOnInit(): void {
  }
  closeDialog(){
    this.dialogRef.close();
  }
  checkRouteUrl() {
    return this.router.url == '/main/redeem/order-detail';
  }

}
