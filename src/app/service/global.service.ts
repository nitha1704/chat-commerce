import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  isLoginService = new BehaviorSubject<boolean>(false);

  constructor() { }

  getIsLogin() {
    return this.isLoginService;
  }
}
