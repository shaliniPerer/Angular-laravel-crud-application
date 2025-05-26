import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [CommonModule, HttpClientModule], 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userArray: any[] = [];
  isLoading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/api/students').subscribe({
      next: (data) => {
        this.userArray = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.isLoading = false;
      }
    });
  }

  setUpdate(user: any): void {
    // You can redirect to an edit form or open a modal if needed
    alert(`Edit user: ${user.name}`);
  }

  setDelete(user: any): void {
    if (confirm(`Are you sure you want to delete user ${user.name}?`)) {
      this.http.delete(`http://127.0.0.1:8000/api/students/${user.id}`, {
        responseType: 'text'
      }).subscribe({
        next: () => {
          alert('User deleted successfully');
          this.fetchUsers(); 
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert('Failed to delete user');
        }
      });
    }
  }
}
