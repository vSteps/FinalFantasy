import { Component } from '@angular/core';
import { GrpcClientService } from '../../services/grpc-client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private grpcClient: GrpcClientService) {}

  register() {
    this.grpcClient.register(this.username, this.email, this.password).subscribe(
      response => {
        console.log('Registro bem-sucedido:', response);
      },
      error => {
        console.error('Erro no registro:', error);
      }
    );
  }
}
