/* eslint-disable @angular-eslint/component-selector */
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'empty-layout',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmptyLayoutComponent {
  /**
   * Constructor
   */
  constructor() {}
}
