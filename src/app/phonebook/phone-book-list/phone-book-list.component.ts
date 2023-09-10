import { Component, OnInit } from '@angular/core';
import { PhoneBookService } from '../services/phone-book.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Observable, first, tap } from 'rxjs';
import { NotificationService, NotificationType } from 'src/app/core/services/notification.service';
import { AddContactService } from '../add-contact/add-contact.service';

@Component({
  selector: 'app-phone-book-list',
  templateUrl: './phone-book-list.component.html',
  styleUrls: ['./phone-book-list.component.scss'],
})
export class PhoneBookListComponent{
  selectedPhoneBookId: number | undefined;
  contacts: any[] = [];
  phoneBooks$?: Observable<any[]>;

  constructor(
    private _phoneBookService: PhoneBookService,
    private _notficationService: NotificationService,
    private _dataService: AddContactService
    ){
    this.phoneBooks$ = this._phoneBookService.getPhoneBooks();
  }

  onSelectPhoneBook(phoneBookId: any): void {
    const selectedPhoneBookId = phoneBookId.value;

    if (!isNaN(selectedPhoneBookId)) {
      this.fetchAndDisplayContacts(selectedPhoneBookId);
    } else {
      console.error('Invalid phone book ID.');
    }
  }

  fetchAndDisplayContacts(phoneBookId: number): void {
    this._phoneBookService.getContacts(phoneBookId)
      .subscribe((data: any) => {
        this.contacts = data;
      });
  }

  deleteContact(contactId: number): void {
    const contactIndex = this.contacts.findIndex((contact) => contact.id === contactId);

    if (contactIndex === -1) {
      console.error('Contact not found in the array.');
      return;
    }

    const deletedContact = this.contacts.splice(contactIndex, 1)[0];
    this._dataService.deleteContact(contactId).pipe(
      first(),
      tap(
        _ => this._notficationService.show('Contact Deleted.', NotificationType.SUCCESS),
        _ => this._notficationService.show('Failed to Delete.', NotificationType.ERROR))
    ).subscribe(
      () => { },
      (error) => {
        this.contacts.splice(contactIndex, 0, deletedContact);
      }
    );
  }


}
