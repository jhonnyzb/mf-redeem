import { Injectable, inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { getSession } from 'src/app/core/encryptData';
import { EnvironmentModel } from 'src/app/core/models/environment.model';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  http: HttpClient = inject(HttpClient);

  getContacts(account: any) {
    return this.http.get(getSession<EnvironmentModel>('env').serverName  + 'v1/contactos/cuenta/' + account);
  }

}
