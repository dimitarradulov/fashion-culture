import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  error = null;
  isSignUpLoading = false;
  isSignInLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  resetLoadingStates() {
    this.isSignInLoading = false;
    this.isSignUpLoading = false;
  }

  onSubmit(form: NgForm) {
    this.error = null;

    let authObs: Observable<AuthResponseData>;

    // Check if form is sign up or sign in
    if (form.value.signUpEmail) {
      this.isSignUpLoading = true;

      const { signUpEmail, signUpPassword, rePassword } = form.value;

      authObs = this.authService.signUp(
        signUpEmail,
        signUpPassword,
        rePassword
      );
    } else {
      this.isSignInLoading = true;

      const { signInEmail, signInPassword } = form.value;

      authObs = this.authService.signIn(signInEmail, signInPassword);
    }

    authObs.subscribe({
      next: (userData) => {
        this.resetLoadingStates();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.resetLoadingStates();
        console.error(err);
        this.error = err.error.error;
      },
    });
  }
}
