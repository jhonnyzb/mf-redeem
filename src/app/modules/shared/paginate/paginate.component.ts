import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent {

  @Input() paginate: any = {};
  @Output() pageCurrent = new EventEmitter<number>();

  totalElements: number = 0;
  totalPages: number = 0;
  pageSize: number = 0;
  rangeInit: number = 0;
  rangeEnd: number = 0;
  currentPage: number = 1;
  itemsCurrentForPage: number = 0;

  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paginate'].currentValue) {
      this.totalElements = changes['paginate'].currentValue.totalElements;
      this.totalPages =  changes['paginate'].currentValue.totalPages;
      this.pageSize = changes['paginate'].currentValue.pageSize;
      this.currentPage = changes['paginate'].currentValue.currentPage;
      this.itemsCurrentForPage = changes['paginate'].currentValue.itemsCurrentForPage;
      this.getPaginate();
    }
  }

  getPaginate() {
    if (this.currentPage === 1) {
      this.rangeEnd = this.itemsCurrentForPage;
      this.rangeInit = this.currentPage;
    } else {
      this.rangeInit = (this.currentPage * this.pageSize - (this.pageSize - 1) );
      this.rangeEnd = Math.min(this.rangeInit + this.pageSize - 1, this.totalElements);
    }
  }

  getLastPage() {
    if (this.totalPages !== 0 && this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages;
      this.pageCurrent.emit(this.currentPage);
    }
  }

  getFirstPage() {
    if (this.totalPages !== 0 && this.currentPage !== 1) {
      this.currentPage = 1;
      this.pageCurrent.emit(this.currentPage);
    }
  }

  getNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage + 1;
      this.pageCurrent.emit(this.currentPage);
    }
  }

  getPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      this.pageCurrent.emit(this.currentPage);
    }
  }


}
