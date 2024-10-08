import { Component, OnInit } from '@angular/core';
import { getSession } from 'src/app/core/encryptData';
import { LoginValeproResponseModel } from 'src/app/core/models/response/loginValeproResponse.model';
import { ProductService } from 'src/app/infrastructure/services/product.service';


@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit {
  listFeaturedArticles: any[] = [];
  isFeaturedArticlesLoaded: boolean = false;
  user: LoginValeproResponseModel = getSession<LoginValeproResponseModel>('accountValepro');

  constructor(
    private productService: ProductService,
  ) {
    document.addEventListener('accountEvent', (event: any) => {
      this.getFeaturedArticles();
    });
  }

  ngOnInit(): void {
    this.user = getSession<LoginValeproResponseModel>('accountValepro');
    setTimeout(() => {

      this.getFeaturedArticles();

    }, 400);
  }


  getFeaturedArticles(): void {
    if (this.user.AccountId && !this.isFeaturedArticlesLoaded) {
      this.isFeaturedArticlesLoaded = true;
      this.listFeaturedArticles = [];
      const params = {
        idCuenta: this.user.AccountId,
        idCluster: 0,
      };
      this.productService.getFeaturedArticles(
        params).subscribe({
        next: (response: any) => {
          //DestacadosGrupo1 -> Articulos destacados
          if (response && response.DestacadosGrupo1) {
            this.listFeaturedArticles = this.sortFeaturedArticles(
              response.DestacadosGrupo1
            );
          }
        },
        error: (error: any) => {
          this.isFeaturedArticlesLoaded = false;
        }
      });
    }
  }

  sortFeaturedArticles(list: any[]){
    if(list){
      list.sort((a, b) => {
        //Ordenar para que se muestre primero los de vista amplia
        if (a.ParametrosExtra == undefined || a.ParametrosExtra == null || !a.ParametrosExtra?.MostrarAmpliado && b.ParametrosExtra?.MostrarAmpliado){
          return 1;
        }
        return -1;
      });
    }
    return list;
  }
}
