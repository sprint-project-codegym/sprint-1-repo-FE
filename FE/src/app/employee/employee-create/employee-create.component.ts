import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {IEmployee} from '../../dto/IEmployee';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../../service/employee.service';
import {ToastrService} from 'ngx-toastr';
import {IPosition} from '../../dto/IPosition';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
// import {url} from 'inspector';
import {AngularFireStorage} from '@angular/fire/storage';
import {EmployeeCustomValidator} from "../../dto/EmployeeCustomValidator";


@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})

export class EmployeeCreateComponent implements OnInit {
  formCreate: FormGroup;
  employee: IEmployee;
  listPosition: IPosition[];
  selectedImage: any = null;
  url: string;
  showLoading = false;
  public employeeCustomValidator: EmployeeCustomValidator = new EmployeeCustomValidator();
  public filePath = 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png';


  constructor(private activeRouter: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private employeeService: EmployeeService,
              public toastrService: ToastrService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.getAllPosition();
    this.formCreate = this.fb.group({
      employeeName: ['',[Validators.required,Validators.maxLength(30), Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/)]],
      employeeBirthday: ['',[Validators.required, Validators.compose([this.employeeCustomValidator.ageLimitValidator(18, 30)])]],
      employeeGender: ['',[Validators.required]],
      employeeGmail: ['',[Validators.required,Validators.pattern(/\b[\w.%-]+@[-.\w]+\.[A-Za-z]{2,4}\b/)]],
      employeeIdCard: ['',[Validators.required, Validators.pattern(/^[\d]{9}|[\d]{12}$/gmu)]],
      employeeAddress: ['',[Validators.required]],
      employeePhone: ['',[Validators.required, Validators.pattern(/^(0|\+84)[\d]{9}|[\d]{11}$/gmu)]],
      employeeSalary: ['',[Validators.required,Validators.max(20),Validators.pattern(/^[0-9]+$/)]],
      position: ['',[Validators.required]],
      urlImage: [],
    });
  }

  getAllPosition() {
    this.employeeService.getAllPosition().subscribe(
      (data)=> {
        this.listPosition = data;
      }
    )
  }

  compareFn(c1: IPosition, c2: IPosition): boolean {
    return c1 && c2 ? c1.positionId === c2.positionId : c1 === c2;
  }

  createEmployee(): void{
    if(this.selectedImage == null){
        this.toastrService.error(
          'Hãy chọn hình ảnh',
          'Có lỗi xảy ra',
          {timeOut: 3000, extendedTimeOut: 1500}
        );
        return;
    }
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
            this.formCreate.patchValue({urlImage: url});
          console.log(this.formCreate.value);
          if (this.formCreate.valid){
            this.showLoading = true;
            this.employeeService.createEmployee(this.formCreate.value).subscribe(
              () => {
                this.showLoading = false;
                this.toastrService.success(
                  'Thêm mới thành công!',
                  'Thông báo!',
                  {timeOut: 3000, extendedTimeOut: 1500}
                );
              },
              error => {
                this.showLoading = false;
                this.toastrService.error(
                  'Trùng thông tin email, CMND hoặc Số điện thoại',
                  'Có lỗi xảy ra',
                  {timeOut: 3000, extendedTimeOut: 1500}
                );
              }
            );
          }
          else {
              this.toastrService.error(
                'Dữ liệu không đúng',
                'Có lỗi xảy ra',
                {timeOut: 3000, extendedTimeOut: 1500}
                );
          }
        });
      })
    ).subscribe();

  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(this.selectedImage);
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  resetForm() {
    this.formCreate.reset();
    this.filePath="";
  }
}
