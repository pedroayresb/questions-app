import { NextFunction, Request, Response } from "express";
import ITest from "../Interfaces/Test.interfaces";
import IQuestion from "../Interfaces/Questions.interfaces";
import TestService from "../Services/Tests.services";

export default class TestController {
  private testService: TestService;
  private req: Request;
  private res: Response;
  private next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction, testService: TestService) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.testService = testService;
  }

  public async create(): Promise<void> {
    const { locals: { user } } = this.res;
    if (user.role !== 'admin') {
      this.res.status(403).json({ message: 'Forbidden' });
    }
    try {
      const { body } = this.req;
      const test = await this.testService.create(body as ITest);
      this.res.status(201).json(test);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll(): Promise<void> {
    try {
      const tests = await this.testService.getAll();
      this.res.status(200).json(tests);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById(): Promise<void> {
    try {
      const { id } = this.req.params;
      const test = await this.testService.findById(id);
      this.res.status(200).json(test);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateById(): Promise<void> {
    const { locals: { user } } = this.res;
    if (user.role !== 'admin') {
      this.res.status(403).json({ message: 'Forbidden' });
    }
    try {
      const { id } = this.req.params;
      const { body } = this.req;
      const test = await this.testService.updateById(id, body as Partial<ITest>);
      this.res.status(200).json(test);
    } catch (error) {
      this.next(error);
    }
  }

  public async deleteById(): Promise<void> {
    const { locals: { user } } = this.res;
    if (user.role !== 'admin') {
      this.res.status(403).json({ message: 'Forbidden' });
    }
    try {
      const { id } = this.req.params;
      const test = await this.testService.deleteById(id);
      this.res.status(200).json(test);
    } catch (error) {
      this.next(error);
    }
  }

  public async addQuestion(): Promise<void> {
    const { locals: { user } } = this.res;
    if (user.role !== 'admin') {
      this.res.status(403).json({ message: 'Forbidden' });
    }
    try {
      const { id } = this.req.params;
      const { body } = this.req;
      const test = await this.testService.addQuestionToTest(id, body as IQuestion);
      this.res.status(200).json(test);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateQuestion(): Promise<void> {
    const { locals: { user } } = this.res;
    if (user.role !== 'admin') {
      this.res.status(403).json({ message: 'Forbidden' });
    }
    try {
      const { id } = this.req.params;
      const { body } = this.req;
      const test = await this.testService.updateQuestionInTest(id, body as IQuestion);
      this.res.status(200).json(test);
    } catch (error) {
      this.next(error);
    }
  }

  public async removeQuestion(): Promise<void> {
    const { locals: { user } } = this.res;
    if (user.role !== 'admin') {
      this.res.status(403).json({ message: 'Forbidden' });
    }
    try {
      const { id } = this.req.params;
      const { body } = this.req;
      const test = await this.testService.deleteQuestionFromTest(id, body as number);
      this.res.status(200).json(test);
    } catch (error) {
      this.next(error);
    }
  }
}
