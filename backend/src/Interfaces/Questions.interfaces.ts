import IAnswer from "./Answers.interfaces";

interface IQuestion {
  number: number;
  text: string;
  answers: IAnswer[];
}

export default IQuestion;
