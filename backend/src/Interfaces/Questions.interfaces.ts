import IAnswer from "./Answers.interfaces";

interface IQuestion {
  number: number;
  text: string;
  answers: {
    [key: string]: IAnswer;
  };
}

export default IQuestion;
