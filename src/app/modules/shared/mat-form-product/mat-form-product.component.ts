import { Component, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { getSession } from 'src/app/core/encryptData';
import { GTMSelectContent } from 'src/app/core/models/gtm-models/gtmSelectContent.model';
import { FormValidators } from 'src/app/utils/form.validators';
import { ConfigService } from 'src/app/infrastructure/services/config.service';
import { LoginValeproResponseModel } from 'src/app/core/models/response/loginValeproResponse.model';



@Component({
  selector: 'app-mat-form-product',
  templateUrl: './mat-form-product.component.html',
  styleUrls: ['./mat-form-product.component.scss']
})
export class MatFormProductComponent  {

  @ViewChild('formDirective') private formDirective: NgForm | undefined;
  registerForm: FormGroup;
  fields: any[] = [];
  submitted: boolean = false;
  documentTypes: any[] = [];
  isLoadingDocumentTypes: boolean = false;
  dialogIcon = "";
  product: any;
  programId: number =  getSession<number>('programId');

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();
    }

    return '';
  };
  user: LoginValeproResponseModel = getSession<LoginValeproResponseModel>('accountValepro');
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any, public dialogRef:MatDialogRef<MatFormProductComponent>,
    private configService: ConfigService
  ) {
    this.product = data;
    this.registerForm = new FormGroup({});
    this.buildForm(data.ParametrosRedimir);
    this.dialogIcon = data.success? "../../../../assets/img/check-circle.svg" : "../../../../assets/img/Icon-material-error.svg";
    this.programId = getSession<number>('programId');
    this.user = getSession<LoginValeproResponseModel>('accountValepro');
  }

  get form() { return this.registerForm.controls; }

  async buildForm(propierties: any) {
    this.fields = [];
    const group: any = {};
    const inputs: any = {};
    for (const propierty of propierties) {
      inputs[propierty.IDCodigo] = propierty;
      group[propierty.IDCodigo] = new FormControl('', this.getValidators(inputs[propierty.IDCodigo]));

      let type = this.getTypeInput(propierty)

      this.fields.push({
        Name: propierty.Descripcion,
        MessageError: propierty.MensajeError,
        Code: propierty.IDCodigo,
        Type: type,
        Input: group[propierty.IDCodigo],
        DataList: await this.getListValues(type, propierty.TipoDato,propierty.IDCodigo)
      });
    }
    this.registerForm = new FormGroup(group);
  }

  getTypeInput(propierty: any){

    if(propierty.TipoDato == 'N'){
      return 'number';
    }

    if(propierty.TipoDato == 'D'){
      return 'date';
    }

    if(propierty.TipoDato.includes('TR')){
      return 'list';
    }

    return 'text';
  }

  async getListValues(type: any, dataType: any, inputCode: any){
    if(type != 'list'){
      return [];
    }
    return await this.getDataFromTable(67, dataType.split("-")[1]);

  }

  getDataFromTable(conceptId: any, tablaId: any) {
    let myPromise = new Promise((myResolve, myReject) => {
      const params = {
        idConcepto: conceptId,
        idtabla: tablaId,
        idPrograma: this.programId
      };
      this.configService.getDataByTable(params).subscribe({
        next: (response: any) => {
          myResolve(response);
        },
        error: (error: any) => {
          console.error("Error obteniendo datos parametricos, ", error);
          myReject(error);
        }
      });
    });
    return myPromise;
  }

  getValidators(input: any): any[] {
    let validators: any[] = [];
    validators.push(Validators.required);
    if (input.ExpresionRegular && input.ExpresionRegular != '') {
      try {
        validators.push(new FormValidators([new RegExp(input.ExpresionRegular), input.IDCodigo.toString()]).validateExpression);
      } catch(e) {}
    }
    return validators;
  }

  changeDatePicker(code: any){
    this.registerForm.controls[code].setValue(moment(this.registerForm.value[code]).format('YYYY-MM-DD'));
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) return;
    this.sendGtmProductDataContent(this.product);
    //obtener data del formulario ya validado
    this.dialogRef.close({
      IsValid: true,
      Data: this.getData()
    });
  }

  getData(){
    let data: any = {};
    for (const [key, control] of Object.entries(this.form)) {
      data[key] = control.value;
    }
    return data;
  }

  closeDialog(){
    this.dialogRef.close({
      IsValid: false
    });
  }


  sendGtmProductDataContent(product: any) {
    let tagData: GTMSelectContent = {
      event: "select_content",
      ParameterTarget: "Productos",
      ParameterLocation: "Formulario",
      ParameterType: "botón",
      ParameterCategory: "Formulario",
      IDAccount: this.user.AccountId,
      UserName: this.user.UserName,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      ParameterText: `Formulario ${product.Nombre} Continuar`,
      ParameterItemID: product.IDPremio,
      Currency: '',
      value: ''
    };
    window.parent.postMessage(JSON.stringify(tagData), '*');
  }
}
