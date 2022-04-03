import {AbstractControl, ValidatorFn} from "@angular/forms";

export class EmployeeCustomValidator {
  constructor() {
  }
  // https://stackoverflow.com/questions/9229213/convert-iso-date-to-milliseconds-in-javascript
  public timeSince(date): any {

    // @ts-ignore
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval);
    }

    return 0;
  }

  // https://codinglatte.com/posts/angular/angular-building-custom-validators/
  public ageLimitValidator(minAge: number, maxAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      // if control value is not null and is a number
      if (control.value !== null) {

        let date = new Date(control.value);
        let age = this.timeSince(date.getTime());
        console.log(age+ " tuổi");
        // return null  if it's in between the minAge and maxAge and is A valid Number
        return age < minAge || // checks if its below the minimum age
        age > maxAge // checks if its above the maximum age
          ? { ageLimit: true } // return this incase of error
          : null; // there was not error
      }
      return null;
    };
  }
}
