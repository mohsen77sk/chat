import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmptyLayoutModule } from './layouts/empty';
import { ClassicLayoutModule } from './layouts/classic';

import { ChatLayoutComponent } from './chat-layout.component';

const layoutModules = [EmptyLayoutModule, ClassicLayoutModule];

@NgModule({
  declarations: [ChatLayoutComponent],
  imports: [CommonModule, ...layoutModules],
  exports: [ChatLayoutComponent, ...layoutModules],
})
export class ChatLayoutModule {}
