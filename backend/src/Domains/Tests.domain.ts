import ITest from "../Interfaces/Test.interfaces";
import IQuestion from "../Interfaces/Questions.interfaces";

export default class Test implements ITest {
  id: string;

  name: string;

  questions: IQuestion[];

  constructor({ id, name, questions }: ITest) {
    this.id = id;
    this.name = name;
    questions.map((question) => {
        Object.keys(question.answers).forEach((key) => {
        question.answers[key].correct = false;
      });
    });
    this.questions = questions;
  }
}