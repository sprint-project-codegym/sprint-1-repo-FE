// import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
//
// export class CustomValidator {
//   function smallerThan(otherControlName: string) {
//     return (control: AbstractControl): { [key: string]: boolean } | null => {
//       if (!control.parent) {
//         return null; // Control is not yet associated with a parent.
//       }
//       const thisValue = control.value;
//       const otherValue = control.parent.get(otherControlName).value;
//       if (thisValue < otherValue) {
//         return null;
//       }
//
//       return {
//         smallerthan: true
//       };
//     };
//   }
//
//   static greaterThan(otherControlName: string) {
//     return (control: AbstractControl): { [key: string]: boolean } | null => {
//       if (!control.parent) {
//         return null; // Control is not yet associated with a parent.
//       }
//       const thisValue = control.value;
//       const otherValue = control.parent.get(otherControlName).value;
//       if (thisValue > otherValue) {
//         return null;
//       }
//
//       return {
//         greaterthan: true
//       };
//     };
//   }
// }
//
//   // static creatDateRangeValidator(): ValidatorFn {
//   //   return (form: FormGroup): ValidationErrors | null => {
//   //
//   //     const start: Date = form.get('startDate').value;
//   //
//   //     const end: Date = form.get('endDate').value;
//   //
//   //     if (start && end) {
//   //       const isRangeValid = (end.getDate() - start.getDate() > 0);
//   //
//   //       return isRangeValid ? null : {dateRange: true};
//   //     }
//   //
//   //     return null;
//   //   };
// // }  // function sumValidator (control: AbstractControl):{[key: string]: boolean} | null {
// //   let minValue = control.get(this.sumFormGroup.get('from')).value;
// //   let maxValue = control.get(this.sumFormGroup.get('to')).value;
// //   if(minValue != maxValue){
// //     return {'ageValidator': true}
// //   }
// //   return null;
// // };
// // static numeric(control: AbstractControl) {
// //   let val = control.value;
// //
// //   if (val === null || val === '') {
// //     return null;
// //   }
// //
// //   if (!val.toString().match('/^[0-9]+(\.?[0-9]+)?$/')) {
// //     return {invalidNumber: true};
// //   }
// //
// //   return null;
// // }
// }
//
// // export function numValue(control: AbstractControl) {
// //   if (control && (control.value !== null || control.value !== undefined)) {
// //     const REGEX = new RegExp('^[0-9]{4}$');
// //     if (!REGEX.test(control.value)) {
// //       return {
// //         isError: true
// //       };
// //     }
// //   }
// //   return null;
// // }
