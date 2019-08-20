import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn, FormArray
} from '@angular/forms';
import { Customer } from '../models/customer';
import { debounceTime } from 'rxjs/operators';



// custom validator with parameters or
// called factory function
function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value != null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { range: true };
    }
    return null;
  };
}

// custome validator
// if the validtor is only for this componet, then it's good to write above component
// for sharing /importing to other cclasses we need to inculde insid component class
// function ratingRange(c: AbstractControl): { [key: string]: boolean } | null {
//   if (c.value != null && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
//     return { 'range': true };
//   }
//   return null;
// }


// Cross field validation
// for cross field need to add both the control in a form group
function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  // if (emailControl.pristine || confirmControl.pristine) {
  //   return null;
  // }

  if (emailControl.value === confirmControl.value) {
    return null;
  } else {
    return { match: true };
  }
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();

  // move valdaitaion message from html to component class
  // thru watch fire the validations
  emailMessage: string;
  private validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'
  };
  constructor(private formBuilder: FormBuilder) {}

  creteForm() {
    this.customerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          confirmEmail: ['', Validators.required]
        }, { validator: emailMatcher}),
      sendCatalog: true,
      addresses: this.formBuilder.array([this.buildAddress()]),
      phone: [],
      notification: ['email'],
      rating: [null, ratingRange(1, 5)]
    });
  }

  get addresses(): FormArray {
    return this.customerForm.get('addresses') as FormArray;
  }

  addAddress(): void{
    this.addresses.push(this.buildAddress());
  }

  buildAddress(): FormGroup{
    return this.formBuilder.group({
      addressType: 'home',
      street1 : '',
      street2: '',
      city: '',
      state: '',
      zip: '',
    });
  }

  populateTestData(): void {
    this.customerForm.patchValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      sendCatalog: false
    });
  }

  // create a validation at runtime
  // as per users input/selection
  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    console.log(this.validationMessages);
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
    }
  }

  ngOnInit() {
    this.creteForm();
    // watch and make changes with values changes
    this.customerForm
      .get('notification')
      .valueChanges.subscribe(value => this.setNotification(value));
    // watcher for email control
    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges.pipe(
      // reactive tranformation, hold the error message for 1ms
      // it will not display error message on setfoucs of each keypress 
      debounceTime(1000)
    ).subscribe(value => this.setMessage(emailControl));
  }
}
