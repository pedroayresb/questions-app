import ITest from "../Interfaces/Test.interfaces";
import IQuestion from "../Interfaces/Questions.interfaces";

export default class Test implements ITest {
  id: string;

  name: string;

  questions: IQuestion[];

  constructor({ id, name, questions }: ITest) {
    this.id = id;
    this.name = name;
    this.questions = questions;
  }
}