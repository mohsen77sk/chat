import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BooleanInput } from '@angular/cdk/coercion';
import { MatMenu } from '@angular/material/menu';

import { ChatHorizontalNavigationComponent } from '@chat/client/shared/ui/navigation';
import { ChatNavigationService } from '@chat/client/shared/ui/navigation';
import { ChatNavigationItem } from '@chat/client/shared/ui/navigation';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'chat-horizontal-navigation-branch-item',
  templateUrl: './branch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatHorizontalNavigationBranchItemComponent implements OnInit, OnDestroy {
  /* eslint-disable @typescript-eslint/naming-convention */
  static ngAcceptInputType_child: BooleanInput;
  /* eslint-enable @typescript-eslint/naming-convention */

  @Input() child = false;
  @Input() item!: ChatNavigationItem;
  @Input() name!: string;
  @ViewChild('matMenu', { static: true }) matMenu!: MatMenu;

  private _chatHorizontalNavigationComponent!: ChatHorizontalNavigationComponent;
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
    this._chatHorizontalNavigationComponent = this._chatNavigationService.getComponent(this.name);

    // Subscribe to onRefreshed on the navigation component
    this._chatHorizontalNavigationComponent.onRefreshed.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
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
   * Trigger the change detection
   */
  triggerChangeDetection(): void {
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

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
