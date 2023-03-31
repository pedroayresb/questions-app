import IAnswer from "./Answers.interfaces";

interface IQuestion {
  text: string;
  answers: IAnswer[];
}

export default IQuestion;
