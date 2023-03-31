import { Schema } from 'mongoose';
import IUser from '../../Interfaces/User.interfaces';
import AbstractODM from '../Repositories/AbstractODM';

class UserODM extends AbstractODM<IUser> {
  constructor() {
    const schema = new Schema({
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      tests_made: {
        type: [String],
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
    });

    super(schema, 'User');
  }
}

export default UserODM;
