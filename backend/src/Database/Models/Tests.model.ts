import { Schema } from 'mongoose';
import ITest from '../../Interfaces/Test.interfaces';
import IQuestion from '../../Interfaces/Questions.interfaces';
import AbstractODM from '../Repositories/AbstractODM';

export default class TestODM extends AbstractODM<ITest> {
  constructor() {
    const schema = new Schema({
      name: {
        type: String,
        required: true,
      },
      questions: {
        type: Object as unknown as IQuestion[],
        required: true,
      },
    });

    super(schema, 'Test');
  }
}