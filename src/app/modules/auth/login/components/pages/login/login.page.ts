import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnInit {
  @ViewChild('loginInput', { static: true }) loginInput!: ElementRef<HTMLInputElement>;

  loginForm = new FormGroup({
    login: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  ngOnInit(): void {
    this.loginInput.nativeElement.focus();
  }

  sendForm() {
    if (this.loginForm.valid) {
      alert('Form sent!' + JSON.stringify(this.loginForm.value));
    }
  }
}
