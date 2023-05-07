import {ModelAdapter} from "../modules/model-adapter/interfaces/model-adapter";
import {PaidFeeModel} from "../models/paid-fee.model";

export class PaidFeeAdapter implements ModelAdapter<PaidFeeModel> {

  adapt(data: any): PaidFeeModel {
    const mappedResponse = new PaidFeeModel();
    mappedResponse.id = data.id;
    mappedResponse.name = data.name;
    mappedResponse.details = data.details;
    mappedResponse.comment = data.comment;
    mappedResponse.dateOfPayment = data.dateOfPayment;
    mappedResponse.value = data.value;

    return mappedResponse;
  }
}
