import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

loginForm : FormGroup;
  errorMessage: string | null = null;

  constructor(private fb : FormBuilder,private authService : AuthService,private router : Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
   
    
    }
   
  )
  }

  hasError(controlName: string, errorName: string) : boolean 
      { 
        const control = this.loginForm.get(controlName);
        return control ? control.hasError(errorName) && (control.dirty || control.touched) : false;
      }


  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.router.navigate(['/transaction']);
        } 
        ,error: (error) => {
          console.error('Login failed:', error);
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
        }
      });
    }
  }




}
