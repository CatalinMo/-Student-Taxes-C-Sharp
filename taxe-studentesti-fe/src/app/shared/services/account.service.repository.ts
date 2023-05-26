import {ConfigurationService} from "../modules/configuration/services/configuration.service";
import {AccountRequest} from "../models/request/account.request";
import {from, Observable} from "rxjs";
import {AccountModel} from "../models/account.model";
import {AccountAdapter} from "../model-adapter/account.adapter";
import {map} from "rxjs/operators";
import {ActiveFeeRequest} from "../models/request/active-fee.request";
import {ActiveFeeModel} from "../models/active-fee.model";
import {ActiveFeeAdapter} from "../model-adapter/active-fee.adapter";
import axios, {AxiosHeaders} from "axios/index";
import {AxiosResponse} from "axios";

const httpOptions = {
  headers: new AxiosHeaders({
    'Content-Type': 'application/json',
  })
};

export class AccountServiceRepository {

  private configuration: any;
  endpoints = {
    createAccount: () => this.configuration.server.host + `student-taxes/create-account`,
    updateAccount: (id: number) => this.configuration.server.host + `student-taxes/account/${id}`,
    updateActiveFee: (id: number) => this.configuration.server.host + `student-taxes/account/active-fee/${id}`,
    assignFeeToAccounts: () => this.configuration.server.host + `student-taxes/accounts`,
    markFeeAsPaid: () => this.configuration.server.host + `student-taxes/account/mark-fee`,
    changePassword: (id: number) => this.configuration.server.host + `student-taxes/account/${id}/change-password`,
    deleteAccount: (id: number) => this.configuration.server.host + `student-taxes/account/${id}`,
    deleteAccountActiveFee: (id: number) => this.configuration.server.host + `student-taxes/account/active-fee/${id}`,
    getAccounts: () => this.configuration.server.host + `student-taxes/accounts`,
    getAccountByEmail: (email: string) => this.configuration.server.host + `student-taxes/account-email/${email}/`,
    getAccountByCnp: (cnp: string) => this.configuration.server.host + `student-taxes/account-cnp/${cnp}`,
    getActiveFees: () => this.configuration.server.host + `student-taxes/accounts/active-fees`
  };

  constructor(
      private configurationService: ConfigurationService,
      private accountAdapter: AccountAdapter,
      private activeFeeAdapter: ActiveFeeAdapter
  ) {
    this.configuration = this.configurationService.getConfig();
  }

  createAccount(account: AccountRequest) {
    return from(axios.post(this.endpoints.createAccount(), account, httpOptions));
  }

  updateAccount(id: number, account: AccountRequest) {
    return from(axios.put(this.endpoints.updateAccount(id), account, httpOptions));
  }

  updateActiveFee(id: number, activeFee: ActiveFeeRequest) {
    return from(axios.put(this.endpoints.updateActiveFee(id), activeFee, httpOptions));
  }

  assignFeeToAccounts(ids: Array<number>, activeFee: ActiveFeeRequest) {
    const requestData = {
      ids: ids,
      activeFee: activeFee
    }
    return from(axios.put(this.endpoints.assignFeeToAccounts(), requestData, httpOptions));
  }

  markFeeAsPaid(accountId: number, activeFeeId: number, accountRequest: AccountRequest) {
    const requestData = {
      accountId: accountId,
      activeFeeId: activeFeeId,
      accountRequest: accountRequest
    }
    return from(axios.put(this.endpoints.markFeeAsPaid(), requestData, httpOptions));
  }

  changePassword(id: number, newPassword: string) {
    return from(axios.put(this.endpoints.changePassword(id), newPassword));
  }

  deleteAccount(id: number) {
    return from(axios.delete(this.endpoints.deleteAccount(id), httpOptions));
  }

  deleteAccountActiveFee(id: number) {
    return from(axios.delete(this.endpoints.deleteAccountActiveFee(id), httpOptions));
  }

  getAccounts(): Observable<Array<AccountModel>> {
    return from(axios.get(this.endpoints.getAccounts(), httpOptions))
        .pipe(
            map((response: AxiosResponse<any>) =>
                response.data.map((account: any) =>
                    this.accountAdapter.adapt(account)
                )
            )
        );
  }

  getAccountByEmail(email: string): Observable<AccountModel> {
    return from(axios.get(this.endpoints.getAccountByEmail(email), httpOptions)).pipe(
        map(account => this.accountAdapter.adapt(account.data))
    );
  }

  getAccountByCnp(cnp: string): Observable<AccountModel> {
    return from(axios.get(this.endpoints.getAccountByCnp(cnp), httpOptions)).pipe(
        map(account => this.accountAdapter.adapt(account.data))
    );
  }

  getActiveFees(): Observable<Array<ActiveFeeModel>> {
    return from(axios.get(this.endpoints.getActiveFees(), httpOptions))
        .pipe(
            map((response: AxiosResponse<any>) =>
                response.data.map((account: any) => {
                  return this.activeFeeAdapter.adapt(account);
                })
            )
        );
  }
}
