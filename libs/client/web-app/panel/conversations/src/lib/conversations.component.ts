import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ConversationsService } from './conversations.service';
import { ConversationsPaginate } from './conversations.types';

@Component({
  selector: 'chat-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationsComponent implements OnInit, OnDestroy {
  conversations$!: Observable<ConversationsPaginate>;
  selectedConversationId!: number | null;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _conversationsService: ConversationsService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.conversations$ = this._conversationsService.getMyConversations();

    // Selected chat
    this._conversationsService.currentConversation$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((currentConversation) => {
        this.selectedConversationId = currentConversation;
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
