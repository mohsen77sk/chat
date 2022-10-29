import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';

import { ChatVerticalNavigationComponent } from '@chat/client/shared/ui/navigation';
import { ChatNavigationService } from '@chat/client/shared/ui/navigation';
import { ChatUtilsService } from '@chat/client/shared/util/utils';
import { ChatNavigationItem } from '@chat/client/shared/ui/navigation';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'chat-vertical-navigation-basic-item',
  templateUrl: './basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatVerticalNavigationBasicItemComponent implements OnInit, OnDestroy {
  @Input() item!: ChatNavigationItem;
  @Input() name!: string;

  isActiveMatchOptions: IsActiveMatchOptions;
  private _chatVerticalNavigationComponent!: ChatVerticalNavigationComponent;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _chatNavigationService: ChatNavigationService,
    private _chatUtilsService: ChatUtilsService
  ) {
    // Set the equivalent of {exact: false} as default for active match options.
    // We are not assigning the item.isActiveMatchOptions directly to the
    // [routerLinkActiveOptions] because if it's "undefined" initially, the router
    // will throw an error and stop working.
    this.isActiveMatchOptions = this._chatUtilsService.subsetMatchOptions;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Set the "isActiveMatchOptions" either from item's
    // "isActiveMatchOptions" or the equivalent form of
    // item's "exactMatch" option
    this.isActiveMatchOptions =
      this.item.isActiveMatchOptions ?? this.item.exactMatch
        ? this._chatUtilsService.exactMatchOptions
        : this._chatUtilsService.subsetMatchOptions;

    // Get the parent navigation component
    this._chatVerticalNavigationComponent = this._chatNavigationService.getComponent(this.name);

    // Mark for check
    this._changeDetectorRef.markForCheck();

    // Subscribe to onRefreshed on the navigation component
    this._chatVerticalNavigationComponent.onRefreshed.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
      // Mark for check
      this._changeDetectorRef.markForCheck();
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
}
