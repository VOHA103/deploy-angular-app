import { __decorate, __metadata } from "tslib";
import { sys_cong_viec_service } from '../../service/sys_cong_viec.service';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { sys_cong_viec_popupComponent } from './popupAdd.component';
import { sys_loai_cong_viec_service } from '../../service/sys_loai_cong_viec.service';
let sys_cong_viec_indexComponent = class sys_cong_viec_indexComponent {
    http;
    sys_cong_viec_service;
    sys_loai_cong_viec_service;
    dialog;
    foods = [];
    listData = [];
    lst_status = [];
    list_loai_cong_viec = [];
    model;
    loading = false;
    total = 0;
    page = 1;
    limit = 10;
    filter = { search: '', total: '0', page: '0', limit: '10', status_del: 1, id_loai_cong_viec: -1 };
    searchKey;
    constructor(http, sys_cong_viec_service, sys_loai_cong_viec_service, dialog) {
        this.http = http;
        this.sys_cong_viec_service = sys_cong_viec_service;
        this.sys_loai_cong_viec_service = sys_loai_cong_viec_service;
        this.dialog = dialog;
        this.DataHanlder();
    }
    DataHanlder() {
        debugger;
        this.loading = false;
        this.sys_cong_viec_service.DataHanlder(this.filter).subscribe((resp) => {
            var model;
            model = resp;
            this.listData = model.data;
            this.total = model.total,
                this.loading = true;
        });
    }
    openDialogDetail(item) {
        const dialogRef = this.dialog.open(sys_cong_viec_popupComponent, {
            width: '850px',
            data: item,
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.DataHanlder();
        });
    }
    getOrders() {
        // this._salesData.getOrders(this.page, this.limit)
        //   .subscribe(res => {
        //     console.log('Result from getOrders: ', res);
        //     this.orders = res['page']['data'];
        //     this.total = res['page'].total;
        //     this.loading = false;
        //   });
    }
    goToPrevious() {
        this.page--;
        this.getOrders();
    }
    goToNext() {
        this.page++;
        this.getOrders();
    }
    goToPage(n) {
        this.page = n;
        this.getOrders();
    }
    onSearchClear() {
        this.searchKey = '';
        this.applyFilter();
    }
    applyFilter() {
        this.listData.filter = this.searchKey.trim().toLowerCase();
    }
    openDialogAdd() {
        const dialogRef = this.dialog.open(sys_cong_viec_popupComponent, {
            width: '850px',
            data: {
                db: {
                    id: '0',
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
        this.sys_cong_viec_service.getAll().subscribe((resp) => {
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
    delete(id) {
        this.sys_cong_viec_service.delete(id).subscribe((result) => {
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
    reven_status(id) {
        this.sys_cong_viec_service.reven_status(id).subscribe((result) => {
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
    get_list_loai_cong_viec() {
        debugger;
        this.sys_loai_cong_viec_service.get_list_use().subscribe((result) => {
            this.list_loai_cong_viec = result;
        });
    }
    ngOnInit() {
        this.DataHanlder();
        this.get_list_loai_cong_viec();
        this.lst_status = [
            {
                id: 1,
                name: '??ang s??? d???ng',
            },
            {
                id: 2,
                name: 'Ng??ng s??? d???ng',
            },
        ];
    }
};
sys_cong_viec_indexComponent = __decorate([
    Component({
        selector: 'sys_cong_viec_index',
        templateUrl: './index.component.html',
        styleUrls: ['./index.component.scss'],
    }),
    __metadata("design:paramtypes", [HttpClient,
        sys_cong_viec_service,
        sys_loai_cong_viec_service,
        MatDialog])
], sys_cong_viec_indexComponent);
export { sys_cong_viec_indexComponent };
//# sourceMappingURL=index.component.js.map