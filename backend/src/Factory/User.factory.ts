import UserODM from "../Database/Models/User.model";
import UserService from "../Services/User.services";

export default class UserFactory {
  public static create(): UserService {
    const userODM = new UserODM();
    const service = new UserService(userODM);
    return service;
  }
}