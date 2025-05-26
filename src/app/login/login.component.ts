import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, FormsModule, HttpClientModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
  
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<any>('http://127.0.0.1:8000/api/login', this.loginData)
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token); // Save token if needed
          this.router.navigate(['/dashboard']); // Redirect to dashboard
        },
        error: () => {
          this.errorMessage = 'Invalid username or password';
        }
      });
  }
}
