import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  signupForm : FormGroup;
  errorMessage: string | null = null;

  constructor(private fb : FormBuilder,private authService : AuthService,private router : Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    
    },
    {
      validator : this.passwordMatchValidator
    }
  
  )
  }

  hasError(controlName: string, errorName: string) : boolean 
      { 
        const control = this.signupForm.get(controlName);
        return control ? control.hasError(errorName) && (control.dirty || control.touched) : false;
      }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }


  onSubmit(): void {
    if (this.signupForm.valid) {
      const credentials = {
        email: this.signupForm.get('email')?.value,
        password: this.signupForm.get('password')?.value
      };

      this.authService.register(credentials).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['/transaction']);
        } 
        ,error: (error) => {
          console.error('Registration failed:', error);
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
        }
      });
    }
  }


}
