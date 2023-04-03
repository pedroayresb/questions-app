import ITestsMade from './TestsMade.interfaces';

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  tests_made: ITestsMade[];
}

export default IUser;
