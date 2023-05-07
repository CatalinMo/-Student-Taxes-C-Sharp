import {ModelAdapter} from "../modules/model-adapter/interfaces/model-adapter";
import {OtherFeeModel} from "../models/other-fee.model";

export class OtherFeeAdapter implements ModelAdapter<OtherFeeModel> {

  adapt(data: any): OtherFeeModel {
    const mappedResponse = new OtherFeeModel();
    mappedResponse.id = data.id;
    mappedResponse.name = data.name;
    mappedResponse.type = data.type;
    mappedResponse.value = data.value;

    return mappedResponse;
  }
}
