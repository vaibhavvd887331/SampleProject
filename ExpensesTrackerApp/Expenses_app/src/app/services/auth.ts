import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, tap, map, BehaviorSubject } from 'rxjs';
import { AuthResponse } from '../models/authresponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
private apiUrl = 'https://localhost:7274/api/Auth';

private currentUserSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient,private router:Router) 
  { 
  const token = localStorage.getItem('token');
  if(token){
    this.currentUserSubject.next('user');
  }
  }

login(credentials : User) : Observable<AuthResponse> {
  // Backend returns a plain JWT string (not JSON). Request text and map to AuthResponse.
  console.log('AuthService.login: attempting login for', credentials.email);
  return this.http.post(this.apiUrl + '/Login', credentials, { responseType: 'text' }).pipe(
    map((tokenString) => {
      const response: AuthResponse = { token: tokenString as string, email: credentials.email };
      return response;
    }),
    tap(response => {
      // store token and log a short snippet for debugging (do not log full token in production)
      localStorage.setItem('token', response.token);
      this.currentUserSubject.next('user');
      console.log('AuthService.login: stored token in localStorage');
      console.log('AuthService.login: currentUserSubject updated');
      console.log('AuthService.login: received token snippet ->', response.token?.toString().slice(0, 12), '...');
    })
  );
}

register(credentials : User) : Observable<AuthResponse> {
  // Backend returns a plain JWT string (not JSON). Request text and map to AuthResponse.
  return this.http.post(this.apiUrl + '/Register', credentials, { responseType: 'text' }).pipe(
    map((tokenString) => {
      const response: AuthResponse = { token: tokenString as string, email: credentials.email };
      return response;
    }),
    tap(response => {
      localStorage.setItem('token', response.token);
      this.currentUserSubject.next('user');
      console.log('AuthService.register: stored token in localStorage');
      console.log('AuthService.register: currentUserSubject updated');
      console.log('AuthService.register: received token snippet ->', response.token?.toString().slice(0, 12), '...');
    })
  );
}

logOut(): void {
  localStorage.removeItem('token');
  this.currentUserSubject.next(null);

  this.router.navigate(['/login']);
  // Optionally, you can also clear all local storage
  // localStorage.clear();
}

isAuthenticated(): boolean {
  return !!localStorage.getItem('token');

}

getToken(): string | null {
  return localStorage.getItem('token');
}

}
