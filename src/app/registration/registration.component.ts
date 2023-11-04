import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ValidationErrors,AbstractControl } from '@angular/forms';

function passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.value;

  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
    return { passwordStrength: true };
  }

  return null;
}
function confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const password = control?.get('password')?.value;
  // console.log(password,"is password inside confirm")
  const confirmPassword = control?.get('confirmPassword')?.value;
console.log(confirmPassword,password,"inside confirmPassword")
  if (password !== confirmPassword) {
    return { passwordMismatch: true };
  }

  return null;
}
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  submitted = false; // Add this property
  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required, confirmPasswordValidator]],
      phoneNumber: ['', [Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)]]
    });
  }
  
  onSubmit() {
    this.submitted = true; // Set submitted to true when the form is submitted
    setTimeout(()=>{
      this.submitted=false
    },5000)
    if (this.registrationForm.valid) {
      // Use non-null assertion operator (!) to assert that these values won't be null
      const name = this.registrationForm?.get('name')!.value;
      const email = this.registrationForm?.get('email')!.value;
      const password = this.registrationForm?.get('password')!.value;
      const confirmPassword = this.registrationForm?.get('confirmPassword')!.value;
  
      // Now you can work with these values
      console.log('User submitted:', name, email, password, confirmPassword);
  
      // You can also create an object if you have a User model
      const user = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      };
     if(password===confirmPassword){
      this.submitted = true; // Set submitted to true when the form is submitted
    setTimeout(()=>{
      alert("Registration succesful")
    },5000)
     }else{
     alert(`password mismatched`)
     }
      // Send the user object to the server or perform any other actions
    }
  }
  
}
