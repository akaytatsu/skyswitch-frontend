import { camelToSnake } from '@vert-capital/design-system-ui';

export class UnpermissionedResponse {
  isUnpermissionedResponse = true;
  message: string;
  code: number;
  data: any;

  constructor(data?: any) {
    this.message = data?.message || '';
    this.code = data?.code || 0;
    this.data = data?.data || {};
  }

  toJson() {
    return {
      message: this.message,
      code: this.code,
      data: this.data,
    };
  }
}

export class TableModel<T, F = any> {
  totalPages: number;
  page: number;
  pageSize: number;
  totalRegisters: number;
  registers: T[];

  constructor(
    private registersConstructor: new (itemData: any) => T,
    data?: any,
    private registerFooterConstructor?: new (itemData: any) => F
  ) {
    this.totalPages = data?.total_pages || 0;
    this.page = data?.page || 0;
    this.pageSize = data?.page_size || 50;
    this.totalRegisters = data?.total_registers || 0;
    this.registers = data?.registers
      ? data.registers.map((item: any) => new this.registersConstructor(item))
      : [];
  }
}

export class TableQueryParamsModel {
  page?: number;
  page_size?: number;
  order_by?: string;
  sort_order?: string;
  search?: string;
  filters?: string;
  [key: string]: any;

  constructor(data?: any) {
    this.page = data?.page;
    this.page_size = data?.pageSize || data?.page_size;
    this.order_by = data?.orderBy || data?.order_by;
    this.sort_order = data?.sortOrder || data?.sort_order;
    this.search = data?.search;
    this.filters = data?.filters;
  }

  toQueryString(): string {
    if (!this?.page_size) this.page_size = 5;
    if (!this?.page) this.page = 0;
    return Object.keys(this)
      .filter((key) => this[key] !== undefined)
      .map((key) => {
        const value =
          typeof this[key] === 'string' ? camelToSnake(this[key]) : this[key];
        return `${key}=${value}`;
      })
      .join('&');
  }
}

export interface PaginationStateModel {
  page: number;
  pageSize: number;
}

export interface SortingStateModel {
  orderBy: string;
  sortOrder: string;
}
