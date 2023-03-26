import { Injectable } from '@angular/core';
import { AuthResponse, Login, Register } from '../interfaces/auth.interface';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  signUp(payload: Register): Observable<AuthResponse> {
    return this.post<AuthResponse>('auth/signup', payload);
  }

  login(payload: Login): Observable<AuthResponse> {
    return this.post<AuthResponse>('auth/login', payload);
  }

  refreshToken(refresh: string): Observable<AuthResponse> {
    return this.post('auth/token', { refreshToken: refresh });
  }
}
