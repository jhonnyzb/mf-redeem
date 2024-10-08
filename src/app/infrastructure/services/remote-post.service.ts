import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RemotePostService {


  constructor() {
  } 
  submitPaymentForm(formData: any): void {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = environment.urlPayU;
    form.target = '_blank'; // Abrir en una nueva ventana
 
    Object.keys(formData).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = formData[key];
      form.appendChild(input);
    });
 
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form); // Eliminar el formulario después de enviarlo
  }
}
