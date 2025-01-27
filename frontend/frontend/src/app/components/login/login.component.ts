import { Component } from '@angular/core';
import { GrpcClientService } from '../../services/grpc-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private grpcClient: GrpcClientService) {}

  login() {
    this.grpcClient.login(this.email, this.password).subscribe(
      response => {
        console.log('Login bem-sucedido:', response);
      },
      error => {
        console.error('Erro no login:', error);
      }
    );
  }
}
