import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

import { chatAnimations } from '@chat/client/shared/animations';
import { ChatNavigationService } from '../navigation.service';
import { ChatScrollbarDirective } from '@chat/client/shared/ui/scrollbar';
import { ChatUtilsService } from '@chat/client/shared/util/utils';
import {
  ChatNavigationItem,
  ChatVerticalNavigationAppearance,
  ChatVerticalNavigationMode,
  ChatVerticalNavigationPosition,
} from '../navigation.types';

import { merge, ReplaySubject, Subject, Subscription, delay, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'chat-vertical-navigation',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss'],
  animations: chatAnimations,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'chatVerticalNavigation',
})
export class ChatVerticalNavigationComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  /* eslint-disable @typescript-eslint/naming-convention */
  static ngAcceptInputType_inner: BooleanInput;
  static ngAcceptInputType_opened: BooleanInput;
  static ngAcceptInputType_transparentOverlay: BooleanInput;
  /* eslint-enable @typescript-eslint/naming-convention */

  @Input() appearance: ChatVerticalNavigationAppearance = 'default';
  @Input() autoCollapse = true;
  @Input() inner = false;
  @Input() mode: ChatVerticalNavigationMode = 'side';
  @Input() name: string = this._chatUtilsService.randomId();
  @Input() navigation!: ChatNavigationItem[];
  @Input() opened = true;
  @Input() position: ChatVerticalNavigationPosition = 'start';
  @Input() transparentOverlay = false;
  @Output() readonly appearanceChanged: EventEmitter<ChatVerticalNavigationAppearance> =
    new EventEmitter<ChatVerticalNavigationAppearance>();
  @Output() readonly modeChanged: EventEmitter<ChatVerticalNavigationMode> =
    new EventEmitter<ChatVerticalNavigationMode>();
  @Output() readonly openedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() readonly positionChanged: EventEmitter<ChatVerticalNavigationPosition> =
    new EventEmitter<ChatVerticalNavigationPosition>();
  @ViewChild('navigationContent') private _navigationContentEl!: ElementRef;

  activeAsideItemId: string | null = null;
  onCollapsableItemCollapsed: ReplaySubject<ChatNavigationItem> = new ReplaySubject<ChatNavigationItem>(1);
  onCollapsableItemExpanded: ReplaySubject<ChatNavigationItem> = new ReplaySubject<ChatNavigationItem>(1);
  onRefreshed: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _animationsEnabled = false;
  private _asideOverlay: HTMLElement | undefined;
  private readonly _handleAsideOverlayClick: any;
  private readonly _handleOverlayClick: any;
  private _hovered = false;
  private _overlay: HTMLElement | undefined;
  private _player!: AnimationPlayer;
  private _scrollStrategy: ScrollStrategy = this._scrollStrategyOptions.block();
  private _chatScrollbarDirectives!: QueryList<ChatScrollbarDirective>;
  private _chatScrollbarDirectivesSubscription!: Subscription;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _animationBuilder: AnimationBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef,
    private _renderer2: Renderer2,
    private _router: Router,
    @Inject(DOCUMENT) private _document: any,
    private _scrollStrategyOptions: ScrollStrategyOptions,
    private _chatNavigationService: ChatNavigationService,
    private _chatUtilsService: ChatUtilsService
  ) {
    this._handleAsideOverlayClick = (): void => {
      this.closeAside();
    };
    this._handleOverlayClick = (): void => {
      this.close();
    };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Host binding for component classes
   */
  @HostBinding('class') get classList(): any {
    return {
      'chat-vertical-navigation-animations-enabled': this._animationsEnabled,
      [`chat-vertical-navigation-appearance-${this.appearance}`]: true,
      'chat-vertical-navigation-hover': this._hovered,
      'chat-vertical-navigation-inner': this.inner,
      'chat-vertical-navigation-mode-over': this.mode === 'over',
      'chat-vertical-navigation-mode-side': this.mode === 'side',
      'chat-vertical-navigation-opened': this.opened,
      'chat-vertical-navigation-position-start': this.position === 'start',
      'chat-vertical-navigation-position-end': this.position === 'end',
    };
  }

  /**
   * Host binding for component inline styles
   */
  @HostBinding('style') get styleList(): any {
    return {
      visibility: this.opened ? 'visible' : 'hidden',
    };
  }

  /**
   * Setter for chatScrollbarDirectives
   */
  @ViewChildren(ChatScrollbarDirective)
  set chatScrollbarDirectives(chatScrollbarDirectives: QueryList<ChatScrollbarDirective>) {
    // Store the directives
    this._chatScrollbarDirectives = chatScrollbarDirectives;

    // Return if there are no directives
    if (chatScrollbarDirectives.length === 0) {
      return;
    }

    // Unsubscribe the previous subscriptions
    if (this._chatScrollbarDirectivesSubscription) {
      this._chatScrollbarDirectivesSubscription.unsubscribe();
    }

    // Update the scrollbars on collapsable items' collapse/expand
    this._chatScrollbarDirectivesSubscription = merge(this.onCollapsableItemCollapsed, this.onCollapsableItemExpanded)
      .pipe(takeUntil(this._unsubscribeAll), delay(250))
      .subscribe(() => {
        // Loop through the scrollbars and update them
        chatScrollbarDirectives.forEach((chatScrollbarDirective) => {
          chatScrollbarDirective.update();
        });
      });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Decorated methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * On mouseenter
   *
   * @private
   */
  @HostListener('mouseenter')
  private _onMouseenter(): void {
    // Enable the animations
    this._enableAnimations();

    // Set the hovered
    this._hovered = true;
  }

  /**
   * On mouseleave
   *
   * @private
   */
  @HostListener('mouseleave')
  private _onMouseleave(): void {
    // Enable the animations
    this._enableAnimations();

    // Set the hovered
    this._hovered = false;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On changes
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Appearance
    if ('appearance' in changes) {
      // Execute the observable
      this.appearanceChanged.next(changes['appearance'].currentValue);
    }

    // Inner
    if ('inner' in changes) {
      // Coerce the value to a boolean
      this.inner = coerceBooleanProperty(changes['inner'].currentValue);
    }

    // Mode
    if ('mode' in changes) {
      // Get the previous and current values
      const currentMode = changes['mode'].currentValue;
      const previousMode = changes['mode'].previousValue;

      // Disable the animations
      this._disableAnimations();

      // If the mode changes: 'over -> side'
      if (previousMode === 'over' && currentMode === 'side') {
        // Hide the overlay
        this._hideOverlay();
      }

      // If the mode changes: 'side -> over'
      if (previousMode === 'side' && currentMode === 'over') {
        // Close the aside
        this.closeAside();

        // If the navigation is opened
        if (this.opened) {
          // Show the overlay
          this._showOverlay();
        }
      }

      // Execute the observable
      this.modeChanged.next(currentMode);

      // Enable the animations after a delay
      // The delay must be bigger than the current transition-duration
      // to make sure nothing will be animated while the mode changing
      setTimeout(() => {
        this._enableAnimations();
      }, 500);
    }

    // Navigation
    if ('navigation' in changes) {
      // Mark for check
      this._changeDetectorRef.markForCheck();
    }

    // Opened
    if ('opened' in changes) {
      // Coerce the value to a boolean
      this.opened = coerceBooleanProperty(changes['opened'].currentValue);

      // Open/close the navigation
      this._toggleOpened(this.opened);
    }

    // Position
    if ('position' in changes) {
      // Execute the observable
      this.positionChanged.next(changes['position'].currentValue);
    }

    // Transparent overlay
    if ('transparentOverlay' in changes) {
      // Coerce the value to a boolean
      this.transparentOverlay = coerceBooleanProperty(changes['transparentOverlay'].currentValue);
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

    // Subscribe to the 'NavigationEnd' event
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        // If the mode is 'over' and the navigation is opened...
        if (this.mode === 'over' && this.opened) {
          // Close the navigation
          this.close();
        }

        // If the mode is 'side' and the aside is active...
        if (this.mode === 'side' && this.activeAsideItemId) {
          // Close the aside
          this.closeAside();
        }
      });
  }

  /**
   * After view init
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      // Return if 'navigation content' element does not exist
      if (!this._navigationContentEl) {
        return;
      }

      // If 'navigation content' element doesn't have
      // perfect scrollbar activated on it...
      if (!this._navigationContentEl.nativeElement.classList.contains('ps')) {
        // Find the active item
        const activeItem = this._navigationContentEl.nativeElement.querySelector(
          '.chat-vertical-navigation-item-active'
        );

        // If the active item exists, scroll it into view
        if (activeItem) {
          activeItem.scrollIntoView();
        }
      }
      // Otherwise
      else {
        // Go through all the scrollbar directives
        this._chatScrollbarDirectives.forEach((chatScrollbarDirective) => {
          // Skip if not enabled
          if (!chatScrollbarDirective.isEnabled()) {
            return;
          }

          // Scroll to the active element
          chatScrollbarDirective.scrollToElement('.chat-vertical-navigation-item-active', -120, true);
        });
      }
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Forcefully close the navigation and aside in case they are opened
    this.close();
    this.closeAside();

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
   * Open the navigation
   */
  open(): void {
    // Return if the navigation is already open
    if (this.opened) {
      return;
    }

    // Set the opened
    this._toggleOpened(true);
  }

  /**
   * Close the navigation
   */
  close(): void {
    // Return if the navigation is already closed
    if (!this.opened) {
      return;
    }

    // Close the aside
    this.closeAside();

    // Set the opened
    this._toggleOpened(false);
  }

  /**
   * Toggle the navigation
   */
  toggle(): void {
    // Toggle
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Open the aside
   *
   * @param item
   */
  openAside(item: ChatNavigationItem): void {
    // Return if the item is disabled
    if (item.disabled || !item.id) {
      return;
    }

    // Open
    this.activeAsideItemId = item.id;

    // Show the aside overlay
    this._showAsideOverlay();

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Close the aside
   */
  closeAside(): void {
    // Close
    this.activeAsideItemId = null;

    // Hide the aside overlay
    this._hideAsideOverlay();

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Toggle the aside
   *
   * @param item
   */
  toggleAside(item: ChatNavigationItem): void {
    // Toggle
    if (this.activeAsideItemId === item.id) {
      this.closeAside();
    } else {
      this.openAside(item);
    }
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

  /**
   * Check Direction
   *
   * @returns direction
   */
  checkDirection(): string {
    return this._document.body.getAttribute('dir');
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Enable the animations
   *
   * @private
   */
  private _enableAnimations(): void {
    // Return if the animations are already enabled
    if (this._animationsEnabled) {
      return;
    }

    // Enable the animations
    this._animationsEnabled = true;
  }

  /**
   * Disable the animations
   *
   * @private
   */
  private _disableAnimations(): void {
    // Return if the animations are already disabled
    if (!this._animationsEnabled) {
      return;
    }

    // Disable the animations
    this._animationsEnabled = false;
  }

  /**
   * Show the overlay
   *
   * @private
   */
  private _showOverlay(): void {
    // Return if there is already an overlay
    if (this._asideOverlay) {
      return;
    }

    // Create the overlay element
    this._overlay = this._renderer2.createElement('div');

    // Add a class to the overlay element
    this._overlay?.classList.add('chat-vertical-navigation-overlay');

    // Add a class depending on the transparentOverlay option
    if (this.transparentOverlay) {
      this._overlay?.classList.add('chat-vertical-navigation-overlay-transparent');
    }

    // Append the overlay to the parent of the navigation
    this._renderer2.appendChild(this._elementRef.nativeElement.parentElement, this._overlay);

    // Enable block scroll strategy
    this._scrollStrategy.enable();

    // Create the enter animation and attach it to the player
    this._player = this._animationBuilder
      .build([animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ opacity: 1 }))])
      .create(this._overlay);

    // Play the animation
    this._player.play();

    // Add an event listener to the overlay
    this._overlay?.addEventListener('click', this._handleOverlayClick);
  }

  /**
   * Hide the overlay
   *
   * @private
   */
  private _hideOverlay(): void {
    if (!this._overlay) {
      return;
    }

    // Create the leave animation and attach it to the player
    this._player = this._animationBuilder
      .build([animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ opacity: 0 }))])
      .create(this._overlay);

    // Play the animation
    this._player.play();

    // Once the animation is done...
    this._player.onDone(() => {
      // If the overlay still exists...
      if (this._overlay) {
        // Remove the event listener
        this._overlay.removeEventListener('click', this._handleOverlayClick);

        // Remove the overlay
        this._overlay?.parentNode?.removeChild(this._overlay);
        this._overlay = undefined;
      }

      // Disable block scroll strategy
      this._scrollStrategy.disable();
    });
  }

  /**
   * Show the aside overlay
   *
   * @private
   */
  private _showAsideOverlay(): void {
    // Return if there is already an overlay
    if (this._asideOverlay) {
      return;
    }

    // Create the aside overlay element
    this._asideOverlay = this._renderer2.createElement('div');

    // Add a class to the aside overlay element
    this._asideOverlay?.classList.add('chat-vertical-navigation-aside-overlay');

    // Append the aside overlay to the parent of the navigation
    this._renderer2.appendChild(this._elementRef.nativeElement.parentElement, this._asideOverlay);

    // Create the enter animation and attach it to the player
    this._player = this._animationBuilder
      .build([animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ opacity: 1 }))])
      .create(this._asideOverlay);

    // Play the animation
    this._player.play();

    // Add an event listener to the aside overlay
    this._asideOverlay?.addEventListener('click', this._handleAsideOverlayClick);
  }

  /**
   * Hide the aside overlay
   *
   * @private
   */
  private _hideAsideOverlay(): void {
    if (!this._asideOverlay) {
      return;
    }

    // Create the leave animation and attach it to the player
    this._player = this._animationBuilder
      .build([animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ opacity: 0 }))])
      .create(this._asideOverlay);

    // Play the animation
    this._player.play();

    // Once the animation is done...
    this._player.onDone(() => {
      // If the aside overlay still exists...
      if (this._asideOverlay) {
        // Remove the event listener
        this._asideOverlay.removeEventListener('click', this._handleAsideOverlayClick);

        // Remove the aside overlay
        this._asideOverlay?.parentNode?.removeChild(this._asideOverlay);
        this._asideOverlay = undefined;
      }
    });
  }

  /**
   * Open/close the navigation
   *
   * @param open
   * @private
   */
  private _toggleOpened(open: boolean): void {
    // Set the opened
    this.opened = open;

    // Enable the animations
    this._enableAnimations();

    // If the navigation opened, and the mode
    // is 'over', show the overlay
    if (this.mode === 'over') {
      if (this.opened) {
        this._showOverlay();
      } else {
        this._hideOverlay();
      }
    }

    // Execute the observable
    this.openedChanged.next(open);
  }
}
