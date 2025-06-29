import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ActivatedRoute} from '@angular/router';
import {FloatLabel} from 'primeng/floatlabel';
import {InputIcon} from 'primeng/inputicon';
import {IconField} from 'primeng/iconfield';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-signup',
  imports: [InputTextModule, FormsModule, ReactiveFormsModule, FloatLabel, InputIcon, IconField, InputGroup, InputGroupAddon, Button],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private route = inject(ActivatedRoute)
  signupForm: FormGroup
  private fb = inject(FormBuilder)
  showpass = false
  showpasstype = 'password'

  constructor() {
    this.signupForm = this.fb.group({})
  }

  showPassword() {
    this.showpass = !this.showpass
  }
}
