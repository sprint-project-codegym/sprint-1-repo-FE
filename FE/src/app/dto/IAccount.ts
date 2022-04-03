export interface IAccount {
  accountId?: string;
  userName: string;
  email?: string;
  encryptPw: string;
  token?: string;
  isEnable?: boolean;
  verificationCode?: string;
  enable?: boolean;
}
