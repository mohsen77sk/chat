import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { chatAnimations } from '@chat/client/shared/animations';
import { ChatAlertType } from '@chat/client/shared/ui/alert';
import { AuthService } from '@chat/client/web-app/shell/core/auth';
import { catchError, map } from 'rxjs';

@Component({
  selector: 'chat-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: chatAnimations,
})
export class SignInComponent implements OnInit {
  @ViewChild('signInNgForm') signInNgForm!: NgForm;

  signInForm!: FormGroup;

  showAlert = false;
  alert: { type: ChatAlertType; message: string } = {
    type: 'success',
    message: '',
  };

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.signInForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign in
   */
  signIn(): void {
    // Return if the form is invalid
    if (this.signInForm.invalid) {
      return;
    }

    // Disable the form
    this.signInForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Sign in
    this._authService
      .signIn(this.signInForm.value)
      .pipe(
        map(() => {
          // Set the redirect url.
          // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
          // to the correct page after a successful sign in. This way, that url can be set via
          // routing file and we don't have to touch here.
          const redirectURL =
            this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
            '/signed-in-redirect';

          // Navigate to the redirect url
          this._router.navigateByUrl(redirectURL);
        }),
        catchError((response) => {
          // Re-enable the form
          this.signInForm.enable();

          // Reset the form
          this.signInNgForm.resetForm();

          // Set the alert
          this.alert = {
            type: 'error',
            message: response.error.error,
          };

          // Show the alert
          this.showAlert = true;

          // Throw error
          throw response;
        })
      )
      .subscribe();
  }
}
