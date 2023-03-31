import { isValidObjectId } from "mongoose";
import Test from "../Domains/Tests.domain";
import ITest from "../Interfaces/Test.interfaces";
import IQuestion from "../Interfaces/Questions.interfaces";
import TestODM from "../Database/Models/Tests.model";

const INVALID_ERROR = "Invalid mongo id";
const NOT_FOUND_ERROR = "Test not found";
const INVALID_QUESTION_ERROR = "Invalid question";

export default class TestService {
  private testODM: TestODM;

  constructor(odm: TestODM) {
    this.testODM = odm;
  }

  public async create(test: ITest): Promise<Test> {
    const createdTest = await this.testODM.create(test);
    return new Test(createdTest);
  }

  public async getAll(): Promise<Test[]> {
    const tests = await this.testODM.getAll();
    return tests.map((test) => new Test(test));
  }

  public async findById(id: string): Promise<Test> {
    if (!isValidObjectId(id)) {
      throw new Error(INVALID_ERROR);
    }
    const test = await this.testODM.findById(id);
    if (!test) {
      throw new Error(NOT_FOUND_ERROR);
    }
    return new Test(test);
  }

  public async updateById(id: string, data: Partial<ITest>): Promise<Test> {
    if (!isValidObjectId(id)) {
      throw new Error(INVALID_ERROR);
    }
    const updatedTest = await this.testODM.updateById(id, data);
    if (!updatedTest) {
      throw new Error(NOT_FOUND_ERROR);
    }
    return new Test(updatedTest);
  }

  public async deleteById(id: string): Promise<Test> {
    if (!isValidObjectId(id)) {
      throw new Error(INVALID_ERROR);
    }
    const deletedTest = await this.testODM.deleteById(id);
    if (!deletedTest) {
      throw new Error(NOT_FOUND_ERROR);
    }
    return new Test(deletedTest);
  }

  public async addQuestionToTest(
    testId: string,
    question: IQuestion
  ): Promise<Test> {
    const test = await this.findById(testId);
    if (!test) {
      throw new Error(NOT_FOUND_ERROR);
    }
    if (!question) {
      throw new Error(INVALID_QUESTION_ERROR);
    }
    const updatedTest = await this.testODM.updateById(testId, {
      questions: [...test.questions, question],
    }) as ITest;
    return new Test(updatedTest);
  }
}