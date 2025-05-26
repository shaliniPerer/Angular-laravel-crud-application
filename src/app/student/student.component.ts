import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
  userArray: any[] = [];
  isResultLoaded = false;

  name: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  status: string = 'active';

  selectedFile: File | null = null;  // To hold the selected image file

  currentUserID: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.getAllUsers();
  }

  getAllUsers() {
    this.http.get("http://127.0.0.1:8000/api/students").subscribe((resultData: any) => {
      this.isResultLoaded = true;
      this.userArray = resultData;
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  register() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('username', this.username);
    formData.append('password', this.password);
    formData.append('status', this.status);

    if (this.selectedFile) {
      formData.append('profile_image', this.selectedFile, this.selectedFile.name);
    }

    this.http.post("http://127.0.0.1:8000/api/students", formData).subscribe(() => {
      alert("User Registered Successfully");
      this.router.navigate(['/login']);
    });
  }

  setUpdate(data: any) {
    this.name = data.name;
    this.email = data.email;
    this.username = data.username;
    this.password = ''; // Don't display password
    this.status = data.status;
    this.currentUserID = data.id;
    this.selectedFile = null;  // Clear selected file when editing
  }

  updateRecords() {
    const formData = new FormData();
    formData.append('id', this.currentUserID);
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('username', this.username);
    formData.append('password', this.password);
    formData.append('status', this.status);

    if (this.selectedFile) {
      formData.append('profile_image', this.selectedFile, this.selectedFile.name);
    }

    this.http.put(`http://127.0.0.1:8000/api/students/${this.currentUserID}`, formData).subscribe(() => {
      alert("User Updated Successfully");
      this.getAllUsers();
      this.clearForm();
    });
  }

  save() {
    if (this.currentUserID === '') {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  setDelete(data: any) {
    this.http.delete(`http://127.0.0.1:8000/api/students/${data.id}`, { responseType: 'text' }).subscribe(() => {
      alert("User Deleted");
      this.getAllUsers();
      this.clearForm();
    });
  }

  clearForm() {
    this.name = '';
    this.email = '';
    this.username = '';
    this.password = '';
    this.status = 'active';
    this.selectedFile = null;
    this.currentUserID = '';
  }
}
