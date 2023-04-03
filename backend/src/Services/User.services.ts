import { isValidObjectId } from 'mongoose';
import User from '../Domains/User.domain';
import IUser from '../Interfaces/User.interfaces';
import UserODM from '../Database/Models/User.model';
import CryptoJS from 'crypto-js';
import { createToken } from '../Auth/jwt.auth';

const INVALID_ERROR = 'Invalid mongo id';
const NOT_FOUND_ERROR = 'User not found';

export default class UserService {
  private userODM: UserODM;

  constructor(odm: UserODM) {
    this.userODM = odm;
  }

  public async create(user: IUser): Promise<string> {
    const { email } = user;
    const hasUser = await this.userODM.findOne({ email });
    if (hasUser) {
      throw new Error('User already exists');
    }
    const { password } = user;
    const encryptedPassword = CryptoJS.SHA256(password).toString();
    const createdUser = await this.userODM.create({ ...user, password: encryptedPassword, tests_made: [] });
    const newUser = {...new User(createdUser), password: undefined};
    const token = createToken(newUser);
    return token;
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await this.userODM.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const encryptedPassword = CryptoJS.SHA256(password).toString();
    if (user.password !== encryptedPassword) {
      throw new Error('Invalid password');
    }
    const newUser = {...new User(user), password: undefined};
    const token = createToken(newUser);
    return token;
  }

  public async getAll(): Promise<User[]> {
    const users = await this.userODM.getAll();
    return users.map((user) => new User(user));
  }

  public async findById(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new Error(INVALID_ERROR);
    }
    const user = await this.userODM.findById(id);
    if (!user) {
      throw new Error(NOT_FOUND_ERROR);
    }
    return new User(user);
  }

  public async updateById(id: string, data: Partial<IUser>): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new Error(INVALID_ERROR);
    }
    const updatedUser = await this.userODM.updateById(id, data);
    if (!updatedUser) {
      throw new Error(NOT_FOUND_ERROR);
    }
    return new User(updatedUser);
  }

  public async deleteById(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new Error(INVALID_ERROR);
    }
    const deletedUser = await this.userODM.deleteById(id);
    if (!deletedUser) {
      throw new Error(NOT_FOUND_ERROR);
    }
    return new User(deletedUser);
  }
}