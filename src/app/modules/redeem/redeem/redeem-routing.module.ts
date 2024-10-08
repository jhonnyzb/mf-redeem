import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartComponent } from "./cart/cart.component";
import { AddressComponent } from "./delivery-data/address/address.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { OrderOverviewComponent } from "./order-overview/order-overview.component";
import { RedeemComponent } from "./redeem.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "cart",
        component: CartComponent,
        data: { title: 'Carrito' }
      },
      {
        path: "order-detail",
        component: OrderDetailComponent,
        data: { title: 'Detalle de la orden' }
      },
      {
        path: "order-overview",
        component: OrderOverviewComponent,
        data: { title: 'Descripción de la orden' }
      },
  
      {
        path: "address",
        component: AddressComponent,
        data: { title: 'Dirección' }
      },
      {
        path: "**",
        component: RedeemComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedeemRoutingModule { }
