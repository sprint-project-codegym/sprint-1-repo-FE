import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IEmployee} from "../../model/employee-create/IEmployee";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {EmployeeService} from "../../service/employee.service";
import {ToastrService} from "ngx-toastr";
import {AngularFireStorage} from "@angular/fire/storage";
import {IPosition} from "../../model/employee-create/IPosition";
import {finalize} from "rxjs/operators";
import {formatDate} from "@angular/common";
@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {
  formEdit: FormGroup;
  employee: IEmployee;
  listPosition: IPosition[];
  selectedImage: any = null;
  url: string;
  id: any = 'E120844';
  public filePath = '../../../assets/images/add-image-employee.png';
  fileChange = false;

  constructor(private activeRouter: ActivatedRoute,
             private fb: FormBuilder,
             private router: Router,
             private employeeService: EmployeeService,
             public toastrService: ToastrService,
             @Inject(AngularFireStorage) private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllPosition();
    // this.activeRouter.paramMap.subscribe(
    //   (param: ParamMap) => {
    //     const id = param.get('id');
    //     console.log(id);
    //
    //   })
    this.employeeService.getEmployeeById(this.id).subscribe(
      (data => {
        this.employee = data;

        this.deleteKeyNotUse();


        this.formEdit.setValue(this.employee);
        console.log(this.employee);
        console.log(this.formEdit.value);
        this.filePath = this.employee.urlImage;
      })
    );
  };

  deleteKeyNotUse(): void {
    // delete key
    delete this.employee.position.positionName;
    delete this.employee.account.accountId;
    delete this.employee.account.email;
    delete this.employee.account.token;
    delete this.employee.account.isEnable;
    delete this.employee.account.verificationCode;
    delete this.employee.account.enable;
    delete this.employee.account.encryptPw;
    delete this.employee.deleteFlag;
    delete this.employee.employeeId;
  }

  createForm(){
    this.formEdit = this.fb.group({
      employeeName: ['',[Validators.required, Validators.pattern(/^([\D])+$/gmu)]],
      employeeBirthday: ['',[Validators.required]],
      employeeGender: ['',[Validators.required]],
      employeeGmail: ['',[Validators.required,Validators.pattern(/\b[\w.%-]+@[-.\w]+\.[A-Za-z]{2,4}\b/)]],
      employeeIdCard: ['',[Validators.required, Validators.pattern(/^[\d]{9}|[\d]{12}$/gmu)]],
      employeeAddress: ['',[Validators.required]],
      employeePhone: ['',[Validators.required]],
      employeeSalary: ['',[Validators.required]],
      position: [],
      account: this.fb.group({
        userName: [],
      }),
      urlImage: [],
    });
  }
  getAllPosition() {
    this.employeeService.getAllPosition().subscribe(
      (data)=> {
        this.listPosition = data;
        console.log("position list: ",this.listPosition);
      }
    );
  }

  compareFn(c1: IPosition, c2: IPosition): boolean {
    return c1 && c2 ? c1.positionId === c2.positionId : c1 === c2;
  }

  editEmployee(){
    if (this.formEdit.valid){
      this.employeeService.editEmployee(this.formEdit.value,this.id).subscribe(
        () => {
          this.toastrService.success(
            'Sửa thành công!',
            'Thông báo!',
            {timeOut: 3000, extendedTimeOut: 1500}
          );
        },
        error => {
          this.toastrService.error(
            'Dữ liệu không đúng',
            'Có lỗi xảy ra',
            {timeOut: 3000, extendedTimeOut: 1500}
          );
        }
      );
    }
  }

  saveImage(){
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.formEdit.patchValue({urlImage: url});
          console.log(this.formEdit.value);
          if (this.formEdit.valid){
            this.employeeService.createEmployee(this.formEdit.value).subscribe(
              () => {
                this.toastrService.success(
                  'Thêm mới thành công!',
                  'Thông báo!',
                  {timeOut: 3000, extendedTimeOut: 1500}
                );
              },
              error => {
                this.toastrService.error(
                  'Dữ liệu không đúng',
                  'Có lỗi xảy ra',
                  {timeOut: 3000, extendedTimeOut: 1500}
                );
              }
            );
          }
        });
      })
    ).subscribe();
  }

  editEmployeeAndUpLoadImage() {
    console.log(this.formEdit.value);
    console.log(this.fileChange);

    if(!this.fileChange) {
      this.editEmployee();
    }
    else {
      this.saveImage();
      this.editEmployee();
    }
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
      this.fileChange = true;
    };
    reader.readAsDataURL(this.selectedImage);
  }
}
