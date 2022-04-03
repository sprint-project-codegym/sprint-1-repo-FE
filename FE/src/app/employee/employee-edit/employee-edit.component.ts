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
import {EmployeeCustomValidator} from "../../model/employee-create/EmployeeCustomValidator";
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
  fileChange = false;
  id: any;
  public employeeCustomValidator: EmployeeCustomValidator = new EmployeeCustomValidator();
  showLoading = false;
  public filePath = 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png';

  constructor(private activeRouter: ActivatedRoute,
             private fb: FormBuilder,
             private router: Router,
             private employeeService: EmployeeService,
             public toastrService: ToastrService,
             @Inject(AngularFireStorage) private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllPosition();
    this.activeRouter.paramMap.subscribe(
      (param: ParamMap) => {
        console.log(param);
        const id = param.get('id');
        console.log(id);
        this.id = id;
        this.employeeService.getEmployeeById(id).subscribe(
          (data => {
            this.employee = data;

            this.deleteKeyNotUse();


            this.formEdit.setValue(this.employee);
            console.log(this.employee);
            console.log(this.formEdit.value);
            this.filePath = this.employee.urlImage;
            console.log(this.employee);
          })
        );
      })

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
      employeeName: ['',[Validators.required,Validators.maxLength(30), Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/)]],
      employeeBirthday: ['',[Validators.required, Validators.compose([this.employeeCustomValidator.ageLimitValidator(18, 30)])]],
      employeeGender: ['',[Validators.required]],
      employeeGmail: ['',[Validators.required,Validators.pattern(/\b[\w.%-]+@[-.\w]+\.[A-Za-z]{2,4}\b/)]],
      employeeIdCard: ['',[Validators.required, Validators.pattern(/^[\d]{9}|[\d]{12}$/gmu)]],
      employeeAddress: ['',[Validators.required]],
      employeePhone: ['',[Validators.required, Validators.pattern(/^(0|\+84)[\d]{9}|[\d]{11}$/gmu)]],
      employeeSalary: ['',[Validators.required,Validators.max(20),Validators.pattern(/^[0-9]+$/)]],
      position: ['',[Validators.required]],
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
      this.showLoading = true;
      this.employeeService.editEmployee(this.formEdit.value,this.id).subscribe(
        () => {
          this.showLoading = false;
          this.toastrService.success(
            'Sửa thành công!',
            'Thông báo!',
            {timeOut: 3000, extendedTimeOut: 1500}
          );
        },
        error => {
          this.showLoading = false;
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
    return this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.formEdit.patchValue({urlImage: url});
          this.editEmployee();
        });
      })
    ).subscribe();
  }

  async editEmployeeAndUpLoadImage() {
    if(!this.fileChange) {
      this.editEmployee();
    }
    else {
      this.saveImage();
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
