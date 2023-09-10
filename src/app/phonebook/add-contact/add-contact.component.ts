import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddContactService } from './add-contact.service';
import { Observable, first, tap } from 'rxjs';
import { NotificationService, NotificationType } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent {
  contactForm: FormGroup;
  contactId: string | null;
  phoneBooks$?: Observable<any[]>;
  contact: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _notficationService: NotificationService,
    private _dataService: AddContactService
  ) {
    this.phoneBooks$ = this._dataService.getPhoneBooks();
    this.contactId = this._route.snapshot.paramMap.get('id');

    this.contactForm = this._formBuilder.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      phoneBookId: ['', Validators.required],
    });

    if (this.contactId != null) {
      this._dataService
        .get(this.contactId)
        .pipe(
          first(),
          tap((contact) => {
            this.contact = contact;
            this.contactForm.patchValue({
              name: contact.name,
              number: contact.number,
              phoneBookId: contact.phoneBookId,
            });
          })
        )
        .subscribe();
    }
  }

  handleSubmit(): void {
    let payload = this.contactForm.value;
    payload.number = this.formatPhoneNumber(payload.number);
    if (this.contactId != null)
      payload.id = this.contact.id;
    this._dataService.save(this.contactForm.value, this.contactId == null)
      .pipe(
        first(),
        tap(
          _ => this._notficationService.show('Contact Saved.', NotificationType.SUCCESS),
          _ => this._notficationService.show('Failed to save.', NotificationType.ERROR))
      ).subscribe();
  }

  formatPhoneNumber(phoneNumber: string): string {
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    const formattedNumber = cleanedNumber.replace(
      /(\d{3})(\d{3})(\d{4})/,
      '$1-$2-$3'
    );

    return formattedNumber;
  }
}
