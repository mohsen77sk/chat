import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { chatAnimations } from '@chat/client/shared/animations';
import { ChatUtilsService } from '@chat/client/shared/util/utils';
import { ChatNavigationService } from '../navigation.service';
import { ChatNavigationItem } from '../navigation.types';

import { ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'chat-horizontal-navigation',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss'],
  animations: chatAnimations,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'chatHorizontalNavigation',
})
export class ChatHorizontalNavigationComponent implements OnChanges, OnInit, OnDestroy {
  @Input() name: string = this._chatUtilsService.randomId();
  @Input() navigation!: ChatNavigationItem[];

  onRefreshed: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _chatNavigationService: ChatNavigationService,
    private _chatUtilsService: ChatUtilsService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On changes
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Navigation
    if ('navigation' in changes) {
      // Mark for check
      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // Make sure the name input is not an empty string
    if (this.name === '') {
      this.name = this._chatUtilsService.randomId();
    }

    // Register the navigation component
    this._chatNavigationService.registerComponent(this.name, this);
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Deregister the navigation component from the registry
    this._chatNavigationService.deregisterComponent(this.name);

    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Refresh the component to apply the changes
   */
  refresh(): void {
    // Mark for check
    this._changeDetectorRef.markForCheck();

    // Execute the observable
    this.onRefreshed.next(true);
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
