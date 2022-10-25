import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SignOutComponent } from './sign-out.component';

const routes: Routes = [
  {
    path: '',
    component: SignOutComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [SignOutComponent],
})
export class AuthSignOutModule {}
