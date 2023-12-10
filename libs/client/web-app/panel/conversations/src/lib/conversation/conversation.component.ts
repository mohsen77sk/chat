import {
  AfterViewInit,
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
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { ConversationsService } from '../conversations.service';
import { ConversationInfo, MessagesPaginate } from '../conversations.types';

@Component({
  selector: 'chat-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('conversation', { static: false })
  private _conversation!: ElementRef;

  @ViewChild('messageInput', { static: false })
  private _messageInput!: ElementRef;

  drawerMode: 'over' | 'side' = 'side';
  drawerOpened = false;

  info!: ConversationInfo;
  messages$!: Observable<MessagesPaginate>;

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
        this._messageInput.nativeElement.style.height = 'auto';

        // Detect the changes so the height is applied
        this._changeDetectorRef.detectChanges();

        // Get the scrollHeight and subtract the vertical padding
        this._messageInput.nativeElement.style.height = `${this._messageInput.nativeElement.scrollHeight}px`;

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

    // Subscribe to conversation info
    this._conversationsService
      .getConversationInfo()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((info) => {
        this.info = info;
        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    this.messages$ = this._conversationsService.getConversationMessages();

    this._conversationsService
      .getAddedMessages()
      .pipe(tap((r) => console.log(r)))
      .subscribe();
  }

  /**
   * After view init
   */
  ngAfterViewInit(): void {
    // Prepare the chat for the replies
    this._prepareChatForReply();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // reset current conversation
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

  /**
   * Send message
   */
  sendMessage(): void {
    // Trim the message
    const message = this._messageInput.nativeElement.value.trim();

    // Prepare the chat for the replies && return
    if (!message) {
      this._prepareChatForReply();
      return;
    }

    // Send message
    this._conversationsService.sendMessage(this.info.id, message);

    // Prepare the chat for the replies
    this._prepareChatForReply();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Prepare the chat for the replies
   *
   * @private
   */
  private _prepareChatForReply(): void {
    this._resetMessageInput();
    this._focusMessageInput();
    this._scrollToBottom();
  }

  /**
   * Reset to the message input
   *
   * @private
   */
  private _resetMessageInput(): void {
    if (this._messageInput) {
      this._messageInput.nativeElement.value = '';
    }
  }

  /**
   * Focus to the message input
   *
   * @private
   */
  private _focusMessageInput(): void {
    if (this._messageInput) {
      setTimeout(() => {
        this._messageInput.nativeElement.focus();
      }, 0);
    }
  }

  /**
   * Scroll to bottom content
   *
   * @private
   */
  private _scrollToBottom(): void {
    if (this._conversation) {
      const el = this._conversation.nativeElement as HTMLElement;
      setTimeout(() => {
        el.children
          .item(el.children.length - 1)
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }
}
