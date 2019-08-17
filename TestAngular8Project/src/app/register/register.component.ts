import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(
    private authService: AuthService,
    private alertfyService: AlertifyService
  ) { }

  ngOnInit() { }

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        this.alertfyService.success('Sucessfully registered');
      },
      error => {
        this.alertfyService.error(error);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
