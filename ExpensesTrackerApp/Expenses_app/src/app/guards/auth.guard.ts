import { inject } from "@angular/core"
import { AuthService } from "../services/auth";
import { Router } from "@angular/router";

export const authGuard = () => {
  // Implement your authentication logic here
  const authService = inject(AuthService);
  const router = inject(Router);

 if (authService.isAuthenticated()) {
    return true; // Allow access if authenticated
  }
    // Redirect to login if not authenticated
    router.navigate(['/login']);
    return false;
  

}