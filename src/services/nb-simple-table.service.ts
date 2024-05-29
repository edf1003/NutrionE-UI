import { Injectable } from '@angular/core';
import { MdbPopconfirmService } from 'mdb-angular-ui-kit/popconfirm';
import { PopConfirmDialogComponent } from 'src/components/mdb/pop-confirm-dialog/pop-confirm-dialog.component';
import { NbSimpleTableParams } from 'src/models/models-classes';

@Injectable()
export class NbSimpleTableService {
  constructor(private popConfirmService: MdbPopconfirmService) {}

  deleteItem(tableParams: NbSimpleTableParams<unknown>, event: MouseEvent, e: unknown) {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    const ref = this.popConfirmService.open(PopConfirmDialogComponent, target, {
      popconfirmMode: 'inline',
      position: 'left',
      data: {
        title: '¿Estás seguro?',
        text: 'Este elemento se borrará de forma permanente.',
        acceptText: 'Confirmar',
      },
    });
    ref.onConfirm.subscribe(() => tableParams.doDelete(e));
  }

  goToPage(tableParams: NbSimpleTableParams<unknown>, page: number) {
    tableParams.currentPage = page;
    tableParams.doQuery();
  }

  filter(tableParams: NbSimpleTableParams<unknown>, filter: unknown = null, field: string = null) {
    if (field !== null) {
      tableParams.filter[field] = filter;
    }
    this.goToPage(tableParams, 0);
  }

  reload(tableParams: NbSimpleTableParams<unknown>) {
    this.filter(tableParams);
  }

  orderBy(tableParams: NbSimpleTableParams<unknown>, field: string) {
    if (field === tableParams.orderBy) {
      tableParams.desc = !tableParams.desc;
    } else {
      tableParams.orderBy = field;
    }
    tableParams.doQuery();
  }

  getOrderIcon(tableParams: NbSimpleTableParams<unknown>) {
    return tableParams.desc ? 'fas fa-caret-down' : 'fas fa-caret-up';
  }

  trackById(index: number, item: { id: number | string }) {
    return item.id;
  }
}
