import { sys_chuc_vu_service } from '../../service/sys_chuc_vu.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, takeUntil } from 'rxjs';
import { user_model } from '@/app/model/user.model';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { sys_chuc_vu_popupComponent } from './popupAdd.component';
import { ReplaySubject, Subject } from 'rxjs';
@Component({
  selector: 'sys_chuc_vu_index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class sys_chuc_vu_indexComponent implements OnInit {
  public foods: any = [];
  public listData: any = [];
  public lst_status: any = [];
  public model: user_model;
  public loading = false;
  filter = { search: '', total: '0', page: '0', limit: '10', status_del: '1' };

  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  search: string = '';
  p: number = 0;
  total: number = 100;
  resp: number;
  constructor(
    private http: HttpClient,
    private sys_chuc_vu_service: sys_chuc_vu_service,
    public dialog: MatDialog
  ) {
    this.DataHanlder();
  }
  DataHanlder(): void {
    this.loading = false;
    this.sys_chuc_vu_service.DataHanlder(this.filter).subscribe((resp) => {
      var model: any;
      this.listData = resp;
      this.total = this.resp;
      model = resp;
      this.listData = model.data;
      this.total = model.total;
      this.loading = true;
      this.pageIndex = model.pageIndex;
      this.pageSize = model.pageSize;
      this.totalRow = model.totalRow;
    });
  }
  pageChangeEvent(event: number) {
    this.p = event;
    this.DataHanlder();
  }
  openDialogDetail(item): void {
    const dialogRef = this.dialog.open(sys_chuc_vu_popupComponent, {
      width: '850px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.DataHanlder();
    });
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(sys_chuc_vu_popupComponent, {
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
  loadAPI() {
    this.loading = false;
    this.sys_chuc_vu_service.getAll().subscribe((resp) => {
      this.listData = resp;
      // var result:any;
      // result = resp;
      // this.listData=result.data_list;
      // this.total=result.total,
      // this.page = result.page,
      // this.limit = result.limit,
      this.loading = true;
    });
  }
  delete(id): void {
    this.sys_chuc_vu_service.delete(id).subscribe((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Th??nh c??ng',
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
        this.DataHanlder();
      });
    });
  }
  reven_status(id): void {
    this.sys_chuc_vu_service.reven_status(id).subscribe((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Th??nh c??ng',
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
        this.DataHanlder();
      });
    });
  }
  load_status_del(): void {
    this.lst_status = [
      {
        id: '1',
        name: '??ang s??? d???ng',
      },
      {
        id: '2',
        name: 'Ng??ng s??? d???ng',
      },
    ];
  }
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  ngOnInit(): void {
    this.DataHanlder();
    this.load_status_del();
  }
}
