import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  items: MenuItem[];
  model: any = {};

  constructor(
    public authService: AuthService,
    private alertify1: AlertifyService
  ) {
    this.items = [
      {
        label: 'Angular App'
      },
      {
        label: 'Home',
        routerLink: 'home',
        icon: 'fa fa-home'
      }
    ];
  }

  login() {
    this.authService.login(this.model).subscribe(
      (response: any) => {
        this.alertify1.success('Logged in Sucessfully');
      },
      error => {
        this.alertify1.error(error);
      }
    );
  }

  loggedin() {
    // return this.authService.loggin();
    const token = localStorage.getItem('token');
    return !!token;
    // (!! for true /false)
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify1.message('logged out');
  }

  ngOnInit() {}
}
