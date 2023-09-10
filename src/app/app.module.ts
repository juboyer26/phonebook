import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhoneBookListComponent } from './phonebook/phone-book-list/phone-book-list.component';
import { PhoneBookService } from './phonebook/services/phone-book.service';
import { HttpClientModule } from '@angular/common/http';
import { AddContactComponent } from './phonebook/add-contact/add-contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPhonebookComponent } from './phonebook/add-phonebook/add-phonebook.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    PhoneBookListComponent,
    AddContactComponent,
    AddPhonebookComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      autoDismiss: true,
      preventDuplicates: true
    }),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [PhoneBookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
