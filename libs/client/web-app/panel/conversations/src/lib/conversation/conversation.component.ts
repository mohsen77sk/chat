import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ChatMediaWatcherService } from '@chat/client/shared/util/media-watcher';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ConversationsService } from '../conversations.service';
import { MessagesPaginate, UsersPaginate } from '../conversations.types';

@Component({
  selector: 'chat-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationComponent implements OnInit, OnDestroy {
  @ViewChild('messageInput') messageInput!: ElementRef;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened = false;

  users$!: Observable<UsersPaginate>;
  messages$!: Observable<MessagesPaginate>;
  selectedConversationId!: number | null;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _chatMediaWatcherService: ChatMediaWatcherService,
    private _conversationsService: ConversationsService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _ngZone: NgZone
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Decorated methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resize on 'input' and 'ngModelChange' events
   *
   * @private
   */
  @HostListener('input')
  @HostListener('ngModelChange')
  private _resizeMessageInput(): void {
    // This doesn't need to trigger Angular's change detection by itself
    this._ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        // Set the height to 'auto' so we can correctly read the scrollHeight
        this.messageInput.nativeElement.style.height = 'auto';

        // Detect the changes so the height is applied
        this._changeDetectorRef.detectChanges();

        // Get the scrollHeight and subtract the vertical padding
        this.messageInput.nativeElement.style.height = `${this.messageInput.nativeElement.scrollHeight}px`;

        // Detect the changes one more time to apply the final height
        this._changeDetectorRef.detectChanges();
      });
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.users$ = this._conversationsService.getConversationUsers();
    this.messages$ = this._conversationsService.getConversationMessages();

    // Selected chat
    this._conversationsService.currentConversation$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((currentConversation) => {
        this.selectedConversationId = currentConversation;
        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Subscribe to media changes
    this._chatMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Set the drawerMode if the given breakpoint is active
        if (matchingAliases.includes('lg')) {
          this.drawerMode = 'side';
        } else {
          this.drawerMode = 'over';
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this._conversationsService.currentConversation = null;
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

  /**
   * Open the conversation info
   */
  openConversationInfo(): void {
    // Open the drawer
    this.drawerOpened = true;

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
}
