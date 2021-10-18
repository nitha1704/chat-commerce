import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogin: boolean = false;

  constructor(private globalService: GlobalService, private router: Router) {}

  ngOnInit(): void {
    this.hamburgerMenuActive();

    this.globalService
      .getIsLogin()
      .subscribe((value) => (this.isLogin = value));
  }

  hamburgerMenuActive() {
    const hamburgerMenu: any = document.querySelector('.hamburger-menu');
    const navbar: any = document.querySelector('nav');

    hamburgerMenu.addEventListener('click', () => {
      hamburgerMenu.classList.toggle('active');

      if (hamburgerMenu.classList.contains('active')) {
        navbar.classList.add('active');
      } else {
        navbar.classList.remove('active');
      }
    });
  }

  removeNavbar() {
    const hamburgerMenu: any = document.querySelector('.hamburger-menu');
    const navbar: any = document.querySelector('nav');

    hamburgerMenu.classList.remove('active');
    navbar.classList.remove('active');
  }

  signOut() {
    this.globalService.isLoginService.next(false);
    localStorage.removeItem('isLogin');
    this.router.navigate([''])
  }
}
