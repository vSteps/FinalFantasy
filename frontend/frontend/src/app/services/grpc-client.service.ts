import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as grpcWeb from 'grpc-web';
import { AccountServiceClient } from '../proto/AccountsServiceClientPb';
import { 
  LoginRequest, 
  LoginResponse, 
  AccountRequest, 
  AccountResponse, 
  ProfileRequest, 
  ProfileResponse 
} from '../proto/accounts_pb';

@Injectable({
  providedIn: 'root'
})
export class GrpcClientService {
  private client: AccountServiceClient;

  constructor() {
    this.client = new AccountServiceClient('http://localhost:50051', null, null);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const request = new LoginRequest();
    request.setEmail(email);
    request.setPassword(password);

    return new Observable(observer => {
      this.client.login(request, {}, (err, response) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  register(username: string, email: string, password: string): Observable<AccountResponse> {
    const request = new AccountRequest();
    request.setUsername(username);
    request.setEmail(email);
    request.setPassword(password);

    return new Observable(observer => {
      this.client.createAccount(request, {}, (err, response) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  getProfile(): Observable<ProfileResponse> {
    const request = new ProfileRequest();

    return new Observable(observer => {
      this.client.getProfile(request, {}, (err, response) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      observer.next();
      observer.complete();
    // Perform any necessary cleanup or state management here
    });
  }
}
