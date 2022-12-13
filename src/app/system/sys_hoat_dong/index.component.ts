import { sys_hoat_dong_service } from '../../service/sys_hoat_dong.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sys_hoat_dong_model } from '@/app/model/sys_hoat_dong.model';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { sys_hoat_dong_popupComponent } from './popupAdd.component';
@Component({
  selector: 'sys_hoat_dong_index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class sys_hoat_dong_indexComponent implements OnInit {
  public foods: any = [];
  public listData: any = [];
  public lst_status: any = [];
  public model: sys_hoat_dong_model;
  public loading = false;

  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  search:string="";
  p: number = 0;
  total: number = 100;
  resp: number;
  filter = { search: '', total: '0', page: '0', limit: '10', status_del: '1' };

  constructor(
    private http: HttpClient,
    private sys_hoat_dong_service: sys_hoat_dong_service,
    public dialog: MatDialog
  ) {
    this.DataHanlder();
  }
  pageChangeEvent(event: number){
    this.p = event;
    this.DataHanlder();
}
  DataHanlder(): void {
     this.loading = false;
     this.sys_hoat_dong_service.DataHanlder(this.filter).subscribe((resp) => {
      var model: any;
      this.listData=resp;
      this.total=this.resp;
      model = resp;
      this.listData = model.data;
      this.total = model.total;
      this.loading = true;
      this.pageIndex = model.pageIndex;
      this.pageSize = model.pageSize;
      this.totalRow = model.totalRow;
     });
   }
  openDialogDetail(item): void {
    const dialogRef = this.dialog.open(sys_hoat_dong_popupComponent, {
      width: '850px',
      data: item,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.DataHanlder();
    });
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(sys_hoat_dong_popupComponent, {
      width: '850px',
      data: {
        db: {
          id: 0,
        },
        lst_cong_viec: null,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.DataHanlder();
    });
  }
   delete(id): void {
    this.sys_hoat_dong_service.delete(id).subscribe((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
        this.DataHanlder();
      });
    });
  }
  reven_status(id): void {
   this.sys_hoat_dong_service.reven_status(id).subscribe((result) => {
     Swal.fire({
       icon: 'success',
       title: 'Thành công',
       showConfirmButton: false,
       timer: 2000,
     }).then((result) => {
       this.DataHanlder();
     });
   });
 }
  ngOnInit(): void {
    this.DataHanlder();
    this.lst_status = [
      {
        id: '1',
        name: 'Đang sử dụng',
      },
      {
        id: '2',
        name: 'Ngưng sử dụng',
      },
    ];
  }
}
