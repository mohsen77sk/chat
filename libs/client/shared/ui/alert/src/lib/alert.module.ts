import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChatAlertComponent } from './alert.component';

@NgModule({
  declarations: [ChatAlertComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ChatAlertComponent],
})
export class ChatAlertModule {}
