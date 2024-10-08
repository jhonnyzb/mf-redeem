import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { RedeemRoutingModule } from './redeem-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { RedeemComponent } from './redeem.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DetailCartComponent } from './detail-cart/detail-cart.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderOverviewComponent } from './order-overview/order-overview.component';
import { AddressComponent } from './delivery-data/address/address.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OrderRepository } from 'src/app/core/repositories/order.repository';
import { OrderService } from 'src/app/infrastructure/services/order.service';
import { DivipolaRepository } from 'src/app/core/repositories/divipola.repository';
import { DivipolaService } from 'src/app/infrastructure/services/divipola.service';
import { ToastGenericRepository } from 'src/app/core/repositories/toastGeneric.repository';
import { ToastGenericService } from 'src/app/infrastructure/services/toast-generic.service';
import { AddressRepository } from 'src/app/core/repositories/address.repository';
import { AddressService } from 'src/app/infrastructure/services/address.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserRepository } from 'src/app/core/repositories/user.respository';
import { UserService } from 'src/app/infrastructure/services/user.service';



@NgModule({
  declarations: [
    RedeemComponent,
    CartComponent,
    DetailCartComponent,
    OrderDetailComponent,
    OrderOverviewComponent,
    AddressComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    RedeemRoutingModule,
    SharedModule,
    FormsModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    { provide: OrderRepository, useClass: OrderService },
    { provide: DivipolaRepository, useClass: DivipolaService },
    { provide: ToastGenericRepository, useClass: ToastGenericService },
    { provide: AddressRepository, useClass: AddressService },
    { provide: UserRepository, useClass: UserService },

  ]

})
export class RedeemModule { }
