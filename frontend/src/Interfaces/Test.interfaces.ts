import IQuestion from "./Questions.interfaces";

interface ITest {
  id: string;
  name: string;
  questions: IQuestion[];
}

export default ITest;
