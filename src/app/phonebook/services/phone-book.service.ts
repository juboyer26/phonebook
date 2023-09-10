import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PhoneBookService {

  constructor(private http: HttpClient) {}

  getPhoneBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/phoneBooks`);
  }

  getContacts(phoneBookId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/phoneBooks/${phoneBookId}/contacts`);
  }

  createPhoneBook(phoneBookData: any): Observable<any> {
    return this.http.post<any>(
      `${environment.api}/phoneBooks`,
      phoneBookData
    );
  }
}
