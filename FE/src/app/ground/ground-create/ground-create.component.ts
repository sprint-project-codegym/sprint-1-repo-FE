import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GroundService} from '../../service/ground.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-ground-create',
  templateUrl: './ground-create.component.html',
  styleUrls: ['./ground-create.component.scss']
})
export class GroundCreateComponent implements OnInit {
  public formAddGround: FormGroup;
  public floorList;
  public inputImage: any;
  public filePath = '../../../assets/images/add-image-ground.png';
  private uploading: boolean;
  private snapshot: any;
  private urlImg;

  constructor(
    public groundService: GroundService,
    public fb: FormBuilder,
    public router: Router,
    public toastrService: ToastrService,
    @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    this.groundService.getAllFloor().subscribe(data => {
      this.floorList = data;
    }, error => {
      console.log('Failed to get floor list!');
    });

    this.initCreateForm();
  }

  initCreateForm() {
    this.formAddGround = this.fb.group({
      groundId: ['', [Validators.required, Validators.pattern('^(MB)[-][\\d]{4}$')]],
      groundType: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      area: ['', [Validators.required, Validators.min(0)]],
      image: [''],
      status: ['', [Validators.required]],
      rentCost: ['', [Validators.required, Validators.min(0)]],
      manageCost: ['', [Validators.required, Validators.min(0)]],
      note: [''],
      version: [1],
      floorDTO: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.inputImage != null) {
      this.uploading = true;
      const imageName = this.getCurrentDateTime() + this.inputImage.name;
      const fileRef = this.storage.ref(imageName);
      this.snapshot = this.storage.upload(imageName, this.inputImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.formAddGround.patchValue({image: url});
            console.log(this.formAddGround);
            this.groundService.addNewGround(this.formAddGround.value).subscribe(data => {
                this.formAddGround.reset();
                this.filePath = '../../../assets/images/add-image-ground.png';
                this.toastrService.success(
                  'Thêm mới thành công!',
                  'Thông báo!',
                  {timeOut: 3000, extendedTimeOut: 1500}
                );
              },
              error => {
                this.toastrService.error(
                  'Mã mặt bằng đã tồn tại!',
                  'Có lỗi xảy ra',
                  {timeOut: 3000, extendedTimeOut: 1500}
                );
              }
            );
          });
        })
      ).subscribe();
    }
  }

  selectImage(event: any) {
    this.inputImage = event.target.files[0];
    this.formAddGround.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(this.inputImage);
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  reset() {
    this.formAddGround.reset();
    this.filePath = '../../../assets/images/add-image-ground.png';
  }
}
