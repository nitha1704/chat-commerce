import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  checkIsLogin: boolean = false;
  isProfileEdit: boolean = false;

  constructor(private globalService: GlobalService, private router: Router) {}

  ngOnInit(): void {
    this.globalService
      .getIsLogin()
      .subscribe((value) => (this.checkIsLogin = value));

    if (!this.checkIsLogin) {
      this.router.navigate(['login']);
    }
  }

  onEdit() {
    const inputs = document.querySelectorAll('.form-group input');
    inputs.forEach((input) => {
      input.removeAttribute('disabled');
    });
    this.isProfileEdit = true;
  }

  saveInfo() {

    const inputs = document.querySelectorAll('.form-group input');
    inputs.forEach((input) => {
      input.setAttribute('value', input.getAttribute('value'));
      input.setAttribute('disabled',"");
      console.log(input.getAttribute('value'))
    });



    this.isProfileEdit = false;
  }
}
