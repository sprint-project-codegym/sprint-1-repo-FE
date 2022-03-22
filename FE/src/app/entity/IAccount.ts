import {IAccountRole} from "./IAccountRole";

export interface IAccount {
  accountId: number;
  userName: string;
  encryptPw: string;

  accountRoleList: IAccountRole[];

}
