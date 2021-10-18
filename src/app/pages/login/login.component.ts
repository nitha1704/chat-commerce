import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  incorrectUser: boolean = false;

  constructor(private globalService: GlobalService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmitLogin() {
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
    } else if (
      this.loginForm.controls.email.value !== 'admin@hotmail.com' ||
      this.loginForm.controls.password.value !== 'admin'
    ) {
      this.loginForm.markAllAsTouched();
      this.incorrectUser = true;
    } else {
      this.incorrectUser = false;
      this.globalService.isLoginService.next(true);
      console.log(this.loginForm);

      localStorage.setItem('isLogin', 'true');
      this.router.navigate(['profile']);
    }
  }



  get email() {
    return this.loginForm.controls.email;
  }
  get password() {
    return this.loginForm.controls.password;
  }
}
