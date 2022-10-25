/* eslint-disable @angular-eslint/component-selector */
import { Component, Inject, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { ChatConfigService } from '@chat/client/shared/util/config';
import { ChatMediaWatcherService } from '@chat/client/shared/util/media-watcher';
import { ChatPlatformService } from '@chat/client/shared/util/platform';

import { combineLatest, filter, map, Subject, takeUntil } from 'rxjs';
import { LayoutDirection, LayoutScheme, LayoutTheme, LayoutType } from './chat-layout.types';
import { LayoutConfig } from './layout.config';

@Component({
  selector: 'layout',
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatLayoutComponent implements OnInit, OnDestroy {
  //
  layoutConfig!: LayoutConfig;
  layoutDirection!: LayoutDirection;
  layoutScheme!: LayoutScheme;
  layoutTheme!: LayoutTheme;
  layoutType!: LayoutType;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _renderer2: Renderer2,
    private _activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private _document: any,
    private _chatConfigService: ChatConfigService,
    private _chatMediaWatcherService: ChatMediaWatcherService,
    private _chatPlatformService: ChatPlatformService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Set the theme and scheme based on the configuration
    combineLatest([
      this._chatConfigService.config$,
      this._chatMediaWatcherService.onMediaQueryChange$([
        '(prefers-color-scheme: dark)',
        '(prefers-color-scheme: light)',
      ]),
    ])
      .pipe(
        takeUntil(this._unsubscribeAll),
        map(([config, mql]) => {
          const options = {
            scheme: config.scheme,
            theme: config.theme,
          };

          // If the scheme is set to 'auto'...
          if (config.scheme === 'auto') {
            // Decide the scheme using the media query
            options.scheme = mql.breakpoints['(prefers-color-scheme: dark)'] ? 'dark' : 'light';
          }

          return options;
        })
      )
      .subscribe((options) => {
        // Store the options
        this.layoutScheme = options.scheme;
        this.layoutTheme = options.theme;

        // Update the layout scheme and layout theme
        this._updateLayoutScheme();
        this._updateLayoutTheme();
      });

    // Subscribe to config changes
    this._chatConfigService.config$.pipe(takeUntil(this._unsubscribeAll)).subscribe((config: LayoutConfig) => {
      // Store the layoutConfig
      this.layoutConfig = config;

      // Update the layout type
      this._updateLayoutDirection();
      this._updateLayoutType();
    });

    // Subscribe to NavigationEnd event
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        // Update the layout type
        this._updateLayoutType();
      });

    // Set the OS name
    this._renderer2.addClass(this._document.body, this._chatPlatformService.osName);
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
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Update the selected layout type
   */
  private _updateLayoutType(): void {
    // Get the current activated route
    let route = this._activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    // 1. Set the type from the layoutConfig
    this.layoutType = this.layoutConfig.type;

    // 2. Get the query parameter from the current route and
    // set the layoutType and save the layoutType to the layoutConfig
    const layoutFromQueryParam = route.snapshot.queryParamMap.get('layoutType') as LayoutType;
    if (layoutFromQueryParam) {
      this.layoutType = layoutFromQueryParam;
      if (this.layoutConfig) {
        this.layoutConfig.type = layoutFromQueryParam;
      }
    }

    // 3. Iterate through the paths and change the layout as we find
    // a config for it.
    //
    // The reason we do this is that there might be empty grouping
    // paths or componentless routes along the path. Because of that,
    // we cannot just assume that the layout configuration will be
    // in the last path's config or in the first path's config.
    //
    // So, we get all the paths that matched starting from root all
    // the way to the current activated route, walk through them one
    // by one and change the layout as we find the layout config. This
    // way, layout configuration can live anywhere within the path and
    // we won't miss it.
    //
    // Also, this will allow overriding the layout in any time so we
    // can have different layouts for different routes.
    const paths = route.pathFromRoot;
    paths.forEach((path) => {
      // Check if there is a 'layout' data
      if (path.routeConfig && path.routeConfig.data && path.routeConfig.data['layoutType']) {
        // Set the layout
        this.layoutType = path.routeConfig.data['layoutType'];
      }
    });
  }

  /**
   * Update the selected scheme
   *
   * @private
   */
  private _updateLayoutScheme(): void {
    // Remove class names for all schemes
    this._document.body.classList.remove('light', 'dark');

    // Add class name for the currently selected scheme
    this._document.body.classList.add(this.layoutScheme);
  }

  /**
   * Update the selected theme
   *
   * @private
   */
  private _updateLayoutTheme(): void {
    // Find the class name for the previously selected theme and remove it
    this._document.body.classList.forEach((className: string) => {
      if (className.startsWith('theme-')) {
        this._document.body.classList.remove(className, className.split('-')[1]);
      }
    });

    // Add class name for the currently selected theme
    this._document.body.classList.add(this.layoutTheme);
  }

  /**
   * Update the selected direction
   *
   * @private
   */
  private _updateLayoutDirection(): void {
    // 1. Set the direction from the layoutConfig
    this.layoutDirection = this.layoutConfig.direction;
    // 2. Change dir attribute for the currently selected direction
    this._document.documentElement.setAttribute('dir', this.layoutDirection);
    this._document.body.setAttribute('dir', this.layoutDirection);
  }
}
