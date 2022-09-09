import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.page.html',
  styleUrls: ['./lost-password.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LostPasswordPage {
  form = new FormGroup({
    loginOrEmail: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  sendForm() {
    if (!this.form.valid) {
      return;
    }

    alert(this.form.value);
  }
}
