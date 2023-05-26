import {AccountRequest} from "@/app/shared/models/request/account.request";
import {AccountModel} from "@/app/shared/models/account.model";

export class AdministratorService {

  accountRequest: AccountRequest;
  account: AccountModel;
  accountId: number;

  setAccountRequest(account: AccountRequest) {
    this.accountRequest = account;
  }

  getAccountRequest(): AccountRequest {
    return this.accountRequest;
  }

  setAccount(account: AccountModel) {
    this.account = account;
  }

  getAccount(): AccountModel {
    return this.account;
  }

  setAccountId(id: number) {
    this.accountId = id;
  }

  getAccountId(): number {
    return this.accountId;
  }
}
