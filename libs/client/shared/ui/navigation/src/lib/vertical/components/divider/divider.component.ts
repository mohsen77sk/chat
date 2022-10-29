import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { ChatVerticalNavigationComponent } from '@chat/client/shared/ui/navigation';
import { ChatNavigationService } from '@chat/client/shared/ui/navigation';
import { ChatNavigationItem } from '@chat/client/shared/ui/navigation';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'chat-vertical-navigation-divider-item',
  templateUrl: './divider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatVerticalNavigationDividerItemComponent implements OnInit, OnDestroy {
  @Input() item!: ChatNavigationItem;
  @Input() name!: string;

  private _chatVerticalNavigationComponent!: ChatVerticalNavigationComponent;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(private _changeDetectorRef: ChangeDetectorRef, private _chatNavigationService: ChatNavigationService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Get the parent navigation component
    this._chatVerticalNavigationComponent = this._chatNavigationService.getComponent(this.name);

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
