import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NavigationService } from './navigation.service';

@NgModule({
  imports: [HttpClientModule],
})
export class NavigationCoreModule {
  /**
   * Constructor
   */
  constructor(private _navigationService: NavigationService) {}
}
