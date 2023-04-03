import IQuestion from "./Questions.interfaces";

interface ITestsMade {
  id: string;
  correct: IQuestion[];
  incorrect: IQuestion[];
}

export default ITestsMade;
