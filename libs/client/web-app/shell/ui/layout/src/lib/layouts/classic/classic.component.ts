/* eslint-disable @angular-eslint/component-selector */
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ChatNavigationService } from '@chat/client/shared/ui/navigation';
import { NavigationService, Navigation } from '@chat/client/web-app/shell/core/navigation';
import { cloneDeep } from 'lodash-es';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'classic-layout',
  templateUrl: './classic.component.html',
  styleUrls: ['./classic.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClassicLayoutComponent implements OnInit, OnDestroy {
  navigation!: Navigation;
  private _unsubscribeAll: Subject<unknown> = new Subject();

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _navigationService: NavigationService,
    private _chatNavigationService: ChatNavigationService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to navigation data
    this._navigationService.navigation$.pipe(takeUntil(this._unsubscribeAll)).subscribe((navigation: Navigation) => {
      this.navigation = cloneDeep(navigation);
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign out
   */
  signOut(): void {
    this._router.navigate(['/sign-out']);
  }
}
