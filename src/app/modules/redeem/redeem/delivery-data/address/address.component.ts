import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { getSession } from "src/app/core/encryptData";
import { DialogParams } from "src/app/core/models/gtm-models/dialogParams.model";
import { DialogService } from "src/app/infrastructure/services/dialog.service";
import { LoginValeproResponseModel } from "src/app/core/models/response/loginValeproResponse.model";
import { ResponseBase } from "src/app/core/models/responseBase.model";
import { AdressResponseModel, ConsultAddressResponseModel } from "src/app/core/models/response/ConsultAddress.model";
import { ErrorResponseModel } from "src/app/core/models/responseError.model";
import { DivipolaResponse } from "src/app/core/models/tables/divipola.model";
import { AddressRepository } from "src/app/core/repositories/address.repository";


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  listAddress: AdressResponseModel[] = [];
  user: LoginValeproResponseModel = getSession<LoginValeproResponseModel>('accountValepro');
  isLoading: boolean = false;
  _listCountry: DivipolaResponse[] = [];
  _listDepartments: DivipolaResponse[] = [];
  _listCities: DivipolaResponse[] = [];
  country: string;
  countryId: number;
  addressloading: boolean = false;
  constructor(
    private addressRepository: AddressRepository,
    private dialogService: DialogService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = getSession<LoginValeproResponseModel>('accountValepro');
    this.getAddress();
  }

  getAddress() {
    this.addressRepository.getAddress().subscribe({
      next: (response: ResponseBase<ConsultAddressResponseModel>) => {
        this.listAddress = this.reOrderAddres(response.data);
        this.country = response.data.countryName;
        this.countryId = response.data.countryId;
        this.addressloading = true;
      },
      error: (error: ResponseBase<ErrorResponseModel[]>) => {
        const params: DialogParams = {
          success: false,
          msg: undefined,
          page: undefined,
          confirmText: undefined
        };
        this.dialogService.openConfirmDialog(error.data[0].errorMessage, params);
      }
    });
  }

  delete(id: number) {
    let params: DialogParams = {
      success: true,
      title: '¿Estás seguro que quieres eliminar esta dirección?',
      buttonNavigationText: 'Eliminar',
      buttonSecondNavigationText: 'Cancelar',
      aditionalText: '0',
      msg: undefined,
      page: undefined,
      confirmText: ""
    }
    this.dialogService.openButtonDialog1(params).afterClosed().subscribe({
      next: (result: boolean) => {
        if (result) {
          this.addressRepository.deleteAddress(id).subscribe({
            next: (response: ResponseBase<null>) => {
              const params: DialogParams = {
                success: true,
                msg: undefined,
                page: undefined,
                confirmText: undefined
              };
              this.dialogService.openConfirmDialog(response.message, params).afterClosed();
              this.getAddress();

            },
            error: (error: ResponseBase<ErrorResponseModel[]>) => {
              const params: DialogParams = {
                success: false,
                msg: undefined,
                page: undefined,
                confirmText: undefined
              };
              this.dialogService.openConfirmDialog(error.data[0].errorMessage, params);

            }
          });
        }
      }
    })

  }
  markAsMain(id: number) {
    this.addressRepository.markAsMain(id).subscribe({
      next: (response: ResponseBase<null>) => {
        const params: DialogParams = {
          success: true,
          msg: undefined,
          page: undefined,
          confirmText: undefined
        };
        this.dialogService.openConfirmDialog(response.message, params).afterClosed()
        this.getAddress();

      },
      error: (error: ResponseBase<ErrorResponseModel[]>) => {
        const params: DialogParams = {
          success: false,
          msg: undefined,
          page: undefined,
          confirmText: undefined
        };
        this.dialogService.openConfirmDialog(error.data[0].errorMessage, params);
      }
    });
  }

  modalOpen() {
    if (!this.addressloading) {
      return
    }
    if (this.listAddress.length > 4) {
      const params: DialogParams = {
        success: false,
        msg: undefined,
        page: undefined,
        confirmText: undefined
      };
      this.dialogService.openConfirmDialog('No puedes agregar más direcciones', params);
      return
    }
    const params: DialogParams = {
      success: false,
      msg: undefined,
      page: undefined,
      confirmText: this.countryId.toString()
    };
    this.dialogService.openDialogAddress(params).afterClosed().subscribe(res => {
      this.getAddress();
    });
  }
  goResume() {
    this.router.navigateByUrl('/main/redeem/order-detail')
  }

  reOrderAddres(data: ConsultAddressResponseModel): AdressResponseModel[] {
    return data.Addresses.sort((a, b) => {
      if (a.ResidenceAddressId === 0) {
        return -1;
      } else if (b.ResidenceAddressId === 0) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
