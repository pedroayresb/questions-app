import IUser from '../Interfaces/User.interfaces';
import ITestsMade from '../Interfaces/TestsMade.interfaces';

export default class User implements IUser {
  id: string;

  name: string;

  email: string;

  password: string;

  role: string;

  tests_made: ITestsMade[];

  constructor({
    id,
    name,
    email,
    password,
    role,
    tests_made,
  }: IUser) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.tests_made = tests_made;
  }
}