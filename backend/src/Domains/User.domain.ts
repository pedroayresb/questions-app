import IUser from '../Interfaces/User.interfaces';

export default class User implements IUser {
  id: string;

  name: string;

  email: string;

  password: string;

  tests_made: string[];

  constructor({
    id,
    name,
    email,
    password,
    tests_made,
  }: IUser) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.tests_made = tests_made;
  }
}