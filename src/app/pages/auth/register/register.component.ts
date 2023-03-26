import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  private destroy$ = new Subject();

  constructor(
    private authService: AuthService,
    private router: Router,
    private readonly fb: NonNullableFormBuilder
  ) {
    this.registrationForm = fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  public onSignUp() {
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.invalid) return;

    this.authService
      .signUp(this.registrationForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        console.log(this.registrationForm.value);
        this.router.navigate(['/auth/login']);
      });
  }

  ngOnInit() {
    this.registrationForm
      .get('password')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((pas) => {
        const confirmPas = this.registrationForm.get('confirmPassword')?.value;
        if (pas && confirmPas && pas !== confirmPas) {
          this.registrationForm
            .get('confirmPassword')
            ?.setErrors({ notMatch: true });
        } else {
          this.registrationForm.get('confirmPassword')?.setErrors(null);
        }
      });

    this.registrationForm
      .get('confirmPassword')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((pas) => {
        const confirmPas = this.registrationForm.get('password')?.value;
        if (pas && confirmPas && pas !== confirmPas) {
          this.registrationForm
            .get('confirmPassword')
            ?.setErrors({ notMatch: true });
        } else {
          this.registrationForm.get('confirmPassword')?.setErrors(null);
        }
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
