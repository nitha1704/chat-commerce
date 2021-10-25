import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/service/global.service';

declare var FB: any;
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
    this.getFBSDK();
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
      input.setAttribute('disabled', '');
      console.log(input.getAttribute('value'));
    });
    this.isProfileEdit = false;
  }

  getFBSDK() {
    (<any>window).fbAsyncInit = function () {
      FB.init({
        appId: '870578177158205',
        cookie: true,
        xfbml: true,
        version: 'v12.0',
      });

      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js: any,
        fjs: any = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  onLogin() {
    FB.login(
      (res: any) => {
        console.log(res);
        this.getFBData(res.authResponse.accessToken, res.authResponse.userID);
      },
      {
        scope:
          'public_profile, email, pages_messaging, pages_messaging_phone_number, pages_manage_ads, pages_manage_metadata, pages_read_engagement',
        auth_type: 'rerequest',
      }
    );
  }

  getFBData(accessToken: any, userID: any) {
    console.log('accessToken:', accessToken,
    '\n' 
    ,'userID:', userID);
    FB.api(
      '/' +
        userID +
        '?fields=id, first_name, last_name, middle_name, name, name_format, picture, short_name, accounts, email',
      (res: any) => {
        if (res && !res.error) {
          console.log(res);
        } else {
          console.log(res);
        }
      }
    );
  }
}
