import { ModelAdapter } from '../../model-adapter/interfaces/model-adapter';
import { AuthModel } from '../models/auth.model';
import { UserAdapter } from './user.adapter';

export class AuthAdapter implements ModelAdapter<AuthModel> {

    constructor(
        private userAdapter: UserAdapter
    ) {
    }

    adapt(data: any): AuthModel {
        const adapt = new AuthModel();
        adapt.token = data.data.token;
        adapt.user = this.userAdapter.adapt(data.data.user);

        return adapt;
    }

}
