import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// @ts-ignore
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {GroundService} from '../../service/ground.service';
// @ts-ignore
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {GroundDTO} from '../../dto/GroundDTO';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-ground-edit',
  templateUrl: './ground-edit.component.html',
  styleUrls: ['./ground-edit.component.scss']
})
export class GroundEditComponent implements OnInit {
  formEditGround: FormGroup;
  ground: GroundDTO;
  public floorList;
  public inputImage: any;
  public filePath;
  private uploading: boolean;
  public rentCostVal: number;
  public manageCostVal: number;
  public floorType;
  public editId;


  constructor(private activeRouter: ActivatedRoute,
              private groundService: GroundService,
              private fb: FormBuilder,
              private router: Router,
              public toastrService: ToastrService,
              private spinner: NgxSpinnerService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {

    this.groundService.getAllFloor().subscribe(data => {
      this.floorList = data;
    }, error => {
      console.log('Failed to get floor list!');
    });

    this.initEditForm();
    this.activeRouter.paramMap.subscribe(
      (param: ParamMap) => {
        const id = param.get('id');
        this.groundService.getGroundById(id).subscribe(
          data => {
            this.ground = data;
            this.formEditGround.patchValue(this.ground);
            this.filePath = this.ground.image;
            this.floorType = this.ground.floorId;
            this.editId = this.ground.groundId;
            console.log(data);
          }
        );
      }
    );
  }

  private initEditForm() {
    this.formEditGround = this.fb.group({
      groundId: [''],
      groundType: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      area: ['', [Validators.required, Validators.min(0)]],
      image: [''],
      status: ['', [Validators.required]],
      rentCost: ['', [Validators.required, Validators.min(0), Validators.pattern('^[\\.0-9]*$')]],
      manageCost: ['', [Validators.required, Validators.min(0), Validators.pattern('^[\\.0-9]*$')]],
      note: [''],
      version: [1],
      floorId: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.inputImage != null) {
      this.spinner.show();
      setTimeout(() => {
        /** spinner ends after 3 seconds */
        this.spinner.hide();
      }, 3000);
      this.uploading = true;
      const imageName = this.getCurrentDateTime() + this.inputImage.name;
      const fileRef = this.storage.ref(imageName);
      this.storage.upload(imageName, this.inputImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.formEditGround.patchValue({image: url});
            console.log(this.formEditGround);
            this.groundService.updateGround(this.formEditGround.value, this.editId).subscribe(data => {
                this.router.navigateByUrl('ground/list');
                this.toastrService.success(
                  'Chỉnh sửa thành công!',
                  'Thông báo!',
                  {timeOut: 3000, extendedTimeOut: 1500}
                );
              },
              error => {
                this.toastrService.error(
                  'Không thể chỉnh sửa mặt bằng!',
                  'Có lỗi xảy ra',
                  {timeOut: 3000, extendedTimeOut: 1500}
                );
              }
            );
          });
        })
      ).subscribe();
    } else {
      this.groundService.updateGround(this.formEditGround.value, this.editId).subscribe(data => {
          this.router.navigateByUrl('ground/list');
          this.toastrService.success(
            'Chỉnh sửa thành công!',
            'Thông báo!',
            {timeOut: 3000, extendedTimeOut: 1500}
          );
        },
        error => {
          this.toastrService.error(
            'Không thể chỉnh sửa mặt bằng!',
            'Có lỗi xảy ra',
            {timeOut: 3000, extendedTimeOut: 1500}
          );
        }
      );
    }
  }

  selectImage(event: any) {
    this.inputImage = event.target.files[0];
    this.formEditGround.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(this.inputImage);
  }


  private getCurrentDateTime() {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  refresh() {
    window.location.reload();
  }
}
