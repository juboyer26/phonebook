import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhoneBookListComponent } from './phonebook/phone-book-list/phone-book-list.component';
import { AddContactComponent } from './phonebook/add-contact/add-contact.component';
import { AddPhonebookComponent } from './phonebook/add-phonebook/add-phonebook.component';

const routes: Routes = [
  { path: '', redirectTo: '/phonebooks', pathMatch: 'full' }, // Redirect to phone books by default
  { path: 'phonebooks', component: PhoneBookListComponent },
  { path: 'contact', component: AddContactComponent },
  { path: 'contact/:id', component: AddContactComponent },
  { path: 'add-phonebook', component: AddPhonebookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
