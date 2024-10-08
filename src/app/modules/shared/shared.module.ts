
import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { UiModule } from "./ui.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MatConfirmDialogComponent } from "./mat-confirm-dialog/mat-confirm-dialog.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { MatRedirectionDialogComponent } from "./mat-redirection-dialog/mat-redirection-dialog.component";
import { MatFormNequiDaviplataComponent } from "./mat-form-nequi-daviplata/mat-form-nequi-daviplata.component";
import { MatFormProductComponent } from "./mat-form-product/mat-form-product.component";
import { MatCodeGenerateComponent } from "./mat-code-generate/mat-code-generate.component";
import { MatAddressDialogComponent } from "./mat-address-dialog/mat-address-dialog.component";
import { MixPaymentComponent } from "./mix-payment/mix-payment.component";
import { FeatureArticlesComponent } from "./feature-articles/feature-articles.component";
import { MatIconModule } from "@angular/material/icon";
import { MatConfirmDialogButtonsComponent } from "./mat-confirm-dialog-buttons/mat-confirm-dialog-buttons.component";
import { PaginateComponent } from "./paginate/paginate.component";


@NgModule({
  declarations: [
    SpinnerComponent,
    MatConfirmDialogComponent,
    MatRedirectionDialogComponent,
    MatFormNequiDaviplataComponent,
    MatFormProductComponent,
    MatCodeGenerateComponent,
    MatAddressDialogComponent,
    MixPaymentComponent,
    FeatureArticlesComponent,
    MatConfirmDialogButtonsComponent,
    PaginateComponent
  ],
  exports: [
    SpinnerComponent,
    MatConfirmDialogComponent,
    MatRedirectionDialogComponent,
    MatFormNequiDaviplataComponent,
    MatFormProductComponent,
    MatCodeGenerateComponent,
    MatAddressDialogComponent,
    MixPaymentComponent,
    FeatureArticlesComponent,
    PaginateComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
  ],
  providers: [
    DatePipe
  ]
})
export class SharedModule { }
