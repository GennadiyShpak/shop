import {Component} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {UserRole} from "../../shared/models";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userRole!: UserRole;

  constructor(private authService: AuthService) {
  }

  onLogIn(): void {
    this.authService.logIn(this.userRole);
  }
}
