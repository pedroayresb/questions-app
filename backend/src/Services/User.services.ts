import { isValidObjectId } from 'mongoose';
import User from '../Domains/User.domain';
import IUser from '../Interfaces/User.interfaces';
import UserODM from '../Database/Models/User.model';

const INVALID_ERROR = 'Invalid mongo id';
const NOT_FOUND_ERROR = 'User not found';

export default class UserService {
  private userODM: UserODM;

  constructor(odm: UserODM) {
    this.userODM = odm;
  }

  public async create(user: IUser): Promise<User> {
    const createdUser = await this.userODM.create(user);
    return new User(createdUser);
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

  public async addTestToUser(userId: string, testId: string): Promise<User> {
    const user = await this.findById(userId);
    user.tests_made.push(testId);
    return this.updateById(userId, user);
  }
}