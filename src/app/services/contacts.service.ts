import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private _http: HttpClient
  ) { }

  getContacts():Observable<Contact[]>{
    return this._http.get<Contact[]>('https://localhost:44330/api/Contacts');
  }

  postContact(body):Observable<any>{
    return this._http.post('https://localhost:44330/api/Contacts', body);
  }

  
  updateContact(body, id):Observable<any>{
    return this._http.put(`https://localhost:44330/api/Contacts/${id}`, body)
  }
}
