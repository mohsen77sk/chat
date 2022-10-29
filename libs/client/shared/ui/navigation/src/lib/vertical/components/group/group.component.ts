import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BooleanInput } from '@angular/cdk/coercion';

import { ChatVerticalNavigationComponent } from '@chat/client/shared/ui/navigation';
import { ChatNavigationService } from '@chat/client/shared/ui/navigation';
import { ChatNavigationItem } from '@chat/client/shared/ui/navigation';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'chat-vertical-navigation-group-item',
  templateUrl: './group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatVerticalNavigationGroupItemComponent implements OnInit, OnDestroy {
  /* eslint-disable @typescript-eslint/naming-convention */
  static ngAcceptInputType_autoCollapse: BooleanInput;
  /* eslint-enable @typescript-eslint/naming-convention */

  @Input() autoCollapse!: boolean;
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

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
