import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { GTMSelectContent } from "src/app/core/models/gtm-models/gtmSelectContent.model";
import { AddressService } from "src/app/infrastructure/services/address.service";
import { TableResponseDto } from "src/app/infrastructure/dto/response/tableResponse.dto";
import { getSession } from "src/app/core/encryptData";
import { LoginValeproResponseModel } from "src/app/core/models/response/loginValeproResponse.model";
import { DivipolaRepository } from "src/app/core/repositories/divipola.repository";
import { HttpErrorResponse } from "@angular/common/http";
import { ResponseBase } from "src/app/core/models/responseBase.model";
import { DivipolaResponse } from "src/app/core/models/tables/divipola.model";
import { ToastGenericRepository } from "src/app/core/repositories/toastGeneric.repository";
import { DivipolaService } from "src/app/infrastructure/services/divipola.service";
import { ToastrService } from "ngx-toastr";
import { TableRepository } from "src/app/core/repositories/tables.repository";
import { TableService } from "src/app/infrastructure/services/tables.service";
import { LanguageEnum } from "src/app/core/enums/languageEnum";
import { GenericListResponseModel } from "src/app/core/models/tables/genericResponse.model";
import { AddressRepository } from "src/app/core/repositories/address.repository";
import { DialogService } from "src/app/infrastructure/services/dialog.service";
import { CreateAddressRequestModel } from "src/app/core/models/request/createAddressRequest.model";
import { DialogParams } from "src/app/core/models/gtm-models/dialogParams.model";
import { ErrorResponseModel } from "src/app/core/models/responseError.model";



@Component({
  selector: 'app-mat-address-dialog',
  templateUrl: './mat-address-dialog.component.html',
  styleUrls: ['./mat-address-dialog.component.scss'],
  providers: [
    { provide: DivipolaRepository, useClass: DivipolaService },
    { provide: TableRepository, useClass: TableService },
    { provide: ToastGenericRepository, useClass: ToastrService },
    { provide: AddressRepository, useClass: AddressService },
  ]
})
export class MatAddressDialogComponent implements OnInit {

  user: LoginValeproResponseModel = getSession<LoginValeproResponseModel>('accountValepro');;
  registerForm: FormGroup;
  submitted: boolean = false;
  isLoadingDepartaments: boolean = false;
  isLoadingCities: boolean = false;
  isLoadingAddressType: boolean = false;
  codeCountry: number = 57;
  departaments: TableResponseDto[] = [];
  cities: TableResponseDto[] = [];
  addressTypes: TableResponseDto[] = [];
  _listDepartments: DivipolaResponse[] = [];
  _listCities: DivipolaResponse[] = [];
  countryId = "";
  listHome: GenericListResponseModel[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MatAddressDialogComponent>,
    private diviPolaRepository: DivipolaRepository,
    private toastGenericRepository: ToastGenericRepository,
    private tablesRepository: TableRepository,
    private addressRepository: AddressRepository,
    private dialogService: DialogService,

  ) {
    this.countryId = data.confirmText;
    this.registerForm = new FormGroup({
      address: new FormControl('', [Validators.required]),
      neighborhood: new FormControl('', [Validators.required]),
      homeType: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      references: new FormControl(null),
    });

  }

  ngOnInit(): void {
    this.user = getSession<LoginValeproResponseModel>('accountValepro');
    this.getDepartments();
    this.getHomeType();
  }
  getDepartments() {
    this.diviPolaRepository.getDepartment(0, this.countryId).subscribe({
      next: (data: ResponseBase<DivipolaResponse[]>) => {
        this._listDepartments = data.data;
      },
      error: (error: HttpErrorResponse) => {
        this.toastGenericRepository.genericErrorMessage();
      }
    });
  }
  getCities() {
    this.diviPolaRepository.getCities(0, this.countryId, this.registerForm.get('department')?.value).subscribe({
      next: (data: ResponseBase<DivipolaResponse[]>) => {
        this._listCities = data.data;
      },
      error: (error: HttpErrorResponse) => {
        this.toastGenericRepository.genericErrorMessage();
      }
    });
  }

  getHomeType() {
    this.tablesRepository.getReferentialData(290, LanguageEnum.Spanish).subscribe({
      next: (data: ResponseBase<GenericListResponseModel[]>) => {
        this.listHome = data.data;
      },
      error: (error: HttpErrorResponse) => {
        this.toastGenericRepository.genericErrorMessage();
      }
    });
  }

  createAddress(){
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      return;
    }
    let create: CreateAddressRequestModel = {
      DepartmentId: this.registerForm.get('department')?.value,
      CityId: this.registerForm.get('city')?.value,
      Neighborhood: this.registerForm.get('neighborhood')?.value,
      ResidenceAddress: this.registerForm.get('address')?.value,
      HousingType: this.registerForm.get('homeType')?.value,
      Observations: this.registerForm.get('references')?.value
    }
    this.addressRepository.createAddress(create).subscribe({
      next: (data: ResponseBase<null>) => {
        const params: DialogParams = {
          success: true,
          msg: undefined,
          page: undefined,
          confirmText: undefined
        };
        this.dialogService.openConfirmDialog(data.message, params);
      },
      error: (error: ResponseBase<ErrorResponseModel[]>) => {
        const params: DialogParams = {
          success: false,
          msg: undefined,
          page: undefined,
          confirmText: undefined
        };
        this.dialogService.openConfirmDialog(error.data[0].errorMessage, params);
      },
      complete: () => {
        this.closeDialog();
      }
    })
  }  
  closeDialog() {
    this.dialogRef.close();
  }

  sendGtmData() {
    let tagData: GTMSelectContent = {
      event: 'select_content',
      ParameterTarget: "",
      ParameterLocation: "",
      ParameterType: "",
      ParameterCategory: "",
      IDAccount: 0,
      UserName: "",
      IDProgram: 0,
      IDPerson: 0,
      ParameterText: "",
      ParameterItemID: "",
      Currency: "",
      value: ""
    };
    window.parent.postMessage(JSON.stringify(tagData), '*');
  }
}
