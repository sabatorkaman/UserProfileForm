import {Component, inject, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ActivatedRoute} from '@angular/router';
import {FloatLabel} from 'primeng/floatlabel';
import {InputIcon} from 'primeng/inputicon';
import {IconField} from 'primeng/iconfield';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {Button} from 'primeng/button';
import {DatePicker} from 'primeng/datepicker';
import {CardModule} from 'primeng/card';
import {SelectButton} from 'primeng/selectbutton';
import {ApiService, GetCountryResponse} from '../api.service';
import {Select} from 'primeng/select';
import {MultiSelectModule} from 'primeng/multiselect';
import {DatePipe, JsonPipe} from '@angular/common';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  console.log(control.value.password === control.value.repeatPassword)
  return control.value.password === control.value.repeatPassword
    ? null
    : {PasswordNoMatch: true};
};

@Component({
  selector: 'app-signup',
  imports: [InputTextModule, MultiSelectModule, CardModule, Select, FormsModule, DatePicker, ReactiveFormsModule, FloatLabel, InputIcon, IconField, InputGroup, InputGroupAddon, Button, SelectButton, DatePipe, JsonPipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private fb = inject(FormBuilder)
  private api = inject(ApiService)
  stateOptions: any[] = [
    {value: 'male', logo: 'pi pi-mars'},
    {value: 'female', logo: 'pi pi-venus'}
  ];

  signupForm: FormGroup
  showpass = false
  countries?: GetCountryResponse
  submittedData: any = null;

  constructor() {
    this.signupForm = this.fb.group({
      username: this.fb.control("", [
        Validators.required,
        Validators.minLength(4)

      ]),
      email: this.fb.control("", [
        Validators.required,
        Validators.email
      ]),
      password: this.fb.control("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10)

      ]),
      repeatPassword: this.fb.control("", [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(4)
      ]),
      date: this.fb.control("", [
        Validators.required
      ]),
      gender: this.fb.control("", [
        Validators.required
      ]),
      birthplace: this.fb.control("", [
        Validators.required
      ]),
      favoriteCountries: this.fb.control("", [
        Validators.required
      ])
    }, {validators: confirmPasswordValidator})
  }

  ngOnInit() {
    this.api.getcountry().subscribe((country) => this.countries = country)
  }

  showPassword() {
    this.showpass = !this.showpass
  }

  submit() {
    if (this.signupForm.valid && this.signupForm.get("repeatPassword")?.value == this.signupForm.get("password")?.value) {
      this.submittedData = this.signupForm.value;
    } else {
      this.submittedData = null;
      this.signupForm.markAllAsTouched();
    }
  }
}
