import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>Angular App</h1>
    <nav>
      <a routerLink="/login">Login</a> | 
      <a routerLink="/register">Register</a> | 
      <a routerLink="/profile">Profile</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
