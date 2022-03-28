import {IContract} from './IContract';

export interface ICustomer {
  customerId: string;
  customerName: string;
  customerBirthday: string;
  customerIdCard: string;
  customerEmail: string;
  customerAddress: string;
  customerPhone: string;
  customerCompany: string;
  customerStatus: string;
  deleteFlag: boolean;
}
