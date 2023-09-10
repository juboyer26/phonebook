import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhoneBookService } from '../services/phone-book.service';
import { first, tap } from 'rxjs';
import { NotificationService, NotificationType } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-add-phonebook',
  templateUrl: './add-phonebook.component.html',
  styleUrls: ['./add-phonebook.component.scss']
})
export class AddPhonebookComponent {
  phoneBookForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _phoneBookService: PhoneBookService,
    private _notficationService: NotificationService,
  ) {
    this.phoneBookForm = this._formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.phoneBookForm.valid) {
      const phoneBookData = this.phoneBookForm.value;

      this._phoneBookService.createPhoneBook(phoneBookData) .pipe(
        first(),
        tap(
          _ => this._notficationService.show('Phonebook Saved.', NotificationType.SUCCESS),
          _ => this._notficationService.show('Failed to save.', NotificationType.ERROR))
      ).subscribe();
    }
  }
}
