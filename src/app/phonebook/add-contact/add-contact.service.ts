import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AddContactService {
  constructor(private _http: HttpClient) { }

  save(payload: any, isNew?: boolean): Observable<any> {
    const url = `${environment.api}/phoneBooks/${payload.phoneBookId}/contacts`;
    return isNew
      ? this._http.post(url, payload)
      : this._http.put(`${environment.api}/contacts/${payload.id}`, payload);
  }

  get(id: any): Observable<any> {
    return this._http.get(`${environment.api}/contacts/${id}`);
  }

  getPhoneBooks(): Observable<any[]> {
    return this._http.get<any[]>(`${environment.api}/phoneBooks`);
  }

  deleteContact(contactId: number): Observable<any> {
    return this._http.delete<any>(
      `${environment.api}/contacts/${contactId}`
    );
  }
}
