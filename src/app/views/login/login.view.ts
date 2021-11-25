import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login.view',
  templateUrl: './login.view.html',
  styleUrls: ['./login.view.scss']
})
export class LoginView {
  form: FormGroup;
  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32)
      ])
    });
  }

  onSubmit() {
    const username = this.form.get('username')?.value;
    this.loginService.login(username);
    this.router.navigate(['']);
  }
}
