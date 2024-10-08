import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class FormValidators{

    private fields: any;

    constructor(fields: any){
        this.fields = fields;
    }

    checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
        const pass = group.parent?.get(this.fields[0])?.value;
        const confirmPass = group.parent?.get(this.fields[1])?.value
        return pass === confirmPass ? null : { notSame: true }
    }

    strongPassword: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
        const pass = group.parent?.get(this.fields[0])?.value;
        const regx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return regx.test(pass) ? null : { notStrong: true }
    }

    validateExpression: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
        const pass = group.parent?.get(this.fields[1])?.value;
        const regx = this.fields[0];
        return regx.test(pass) ? null : { required: true }
    }

    validateCheck: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
        const value = group.parent?.get(this.fields[0])?.value;
        return value ? null : { checked: true }
    }

}