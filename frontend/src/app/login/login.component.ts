import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  errorMessage = 'Este campo es requerido.';
  private isEditing = false;
  private postId!: string;

  user: User = {
    name: '',
    lastName: '',
    email: '',
    identification: '',
    phoneNumber: '',
    password: '',
  };

  constructor(public userService: UserService) {}

  ngOnInit(): void {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.userService.login(form.value.identification, form.value.password);
  }
}
