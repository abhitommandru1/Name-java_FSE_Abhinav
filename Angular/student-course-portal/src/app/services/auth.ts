import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Hardcoded for now — HO7 only requires demonstrating the guard mechanism,
  // not a real authentication flow.
  isLoggedIn = true;
}
