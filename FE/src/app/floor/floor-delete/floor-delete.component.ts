import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FloorService} from "../../service/floor.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-floor-delete',
  templateUrl: './floor-delete.component.html',
  styleUrls: ['./floor-delete.component.scss']
})
export class FloorDeleteComponent implements OnInit {
  @Input()
  deleteId: string;
  @Input()
  deleteName: string;

  @Output()
  deleteComplete = new EventEmitter<boolean>();

  constructor(
    public floorService: FloorService,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  deleteFloor(){
    this.floorService.deleteFloorById(this.deleteId).subscribe(
      data => {
        document.getElementById('closeModal').click();
        this.deleteComplete.emit(true);
      }
    );
  }
}
