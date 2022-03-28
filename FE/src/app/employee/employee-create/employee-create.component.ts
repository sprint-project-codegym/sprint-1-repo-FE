import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IEmployee} from '../../model/employee-create/IEmployee';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../../service/employee.service';
import {ToastrService} from 'ngx-toastr';
import {IPosition} from '../../model/employee-create/IPosition';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
// import {url} from 'inspector';
import {AngularFireStorage} from '@angular/fire/storage';

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
  public filePath = '../../../assets/images/add-image-employee.png';

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
      employeeName: ['',[Validators.required, Validators.pattern(/^([^0-9]*)$/)]],
      employeeBirthday: ['',[Validators.required]],
      employeeGender: ['',[Validators.required]],
      employeeGmail: ['',[Validators.required, Validators.pattern(/\b[\w.%-]+@[-.\w]+\.[A-Za-z]{2,4}\b/)]],
      employeeIdCard: ['',[Validators.required, Validators.pattern(/^[\d]{9}|[\d]{12}$/gmu)]],
      employeeAddress: ['',[Validators.required]],
      employeePhone: ['',[Validators.required]],
      employeeSalary: ['',[Validators.required]],
      position: ['',[Validators.required]],
      urlImage: ['',[Validators.required]],
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
          'Chưa chọn hình ảnh',
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
            this.employeeService.createEmployee(this.formCreate.value).subscribe(
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
