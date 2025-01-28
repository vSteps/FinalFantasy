import { Component, OnInit } from '@angular/core';
import { GrpcClientService } from '../../services/grpc-client.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-profile',
  standalone: true, 
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {
    username: '',
    email: ''
  };

  constructor(private grpcClient: GrpcClientService) {}

  ngOnInit() {
    this.grpcClient.getProfile().subscribe(
      response => {
        this.user.username = response.getUsername();
        this.user.email = response.getEmail();
      },
      error => {
        console.error('Erro ao carregar perfil:', error);
      }
    );
  }

  logout() {
    this.grpcClient.logout().subscribe(
      () => {
        console.log('Logout bem-sucedido');
      },
      error => {
        console.error('Erro no logout:', error);
      }
    );
  }
}
