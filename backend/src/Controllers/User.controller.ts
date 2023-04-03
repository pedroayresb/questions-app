import { NextFunction, Request, Response } from "express";
import IUser from "../Interfaces/User.interfaces";
import UserService from "../Services/User.services";

export default class UserController {
  private userService: UserService;
  private req: Request;
  private res: Response;
  private next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction, userService: UserService) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.userService = userService;
  }

  public async create(): Promise<void> {
    try {
      const { body } = this.req;
      const user = await this.userService.create(body as IUser);
      this.res.status(201).json(user);
    } catch (error) {
      this.next(error);
    }
  }

  public async login(): Promise<void> {
    try {
      const { email, password } = this.req.body;
      const user = await this.userService.login(email, password);
      this.res.status(200).json(user);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll(): Promise<void> {
    const { locals: { user } } = this.res;
    if (user.role !== 'admin') {
      this.res.status(403).json({ message: 'Forbidden' });
    }
    try {
      const users = await this.userService.getAll();
      this.res.status(200).json(users);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById(): Promise<void> {
    try {
      const { id } = this.req.params;
      const user = await this.userService.findById(id);
      this.res.status(200).json(user);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateById(): Promise<void> {
    const { locals: { user } } = this.res;
    if (user.role !== 'admin' || user._id !== this.req.params.id) {
      this.res.status(403).json({ message: 'Forbidden' });
    }
    try {
      const { id } = this.req.params;
      const { body } = this.req;
      const user = await this.userService.updateById(id, body as Partial<IUser>);
      this.res.status(200).json(user);
    } catch (error) {
      this.next(error);
    }
  }

  public async deleteById(): Promise<void> {
    const { locals: { user } } = this.res;
    if (user.role !== 'admin' || user._id !== this.req.params.id) {
      this.res.status(403).json({ message: 'Forbidden' });
    }
    try {
      const { id } = this.req.params;
      const user = await this.userService.deleteById(id);
      this.res.status(200).json(user);
    } catch (error) {
      this.next(error);
    }
  }
}
