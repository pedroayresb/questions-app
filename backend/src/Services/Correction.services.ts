import { isValidObjectId } from "mongoose";
import TestODM from "../Database/Models/Tests.model";
import UserODM from '../Database/Models/User.model';
import ICorrectionQuestion from '../Interfaces/Correction.interfaces';
import IQuestion from "../Interfaces/Questions.interfaces";

const INVALID_ERROR = "Invalid mongo id";
const TEST_NOT_FOUND_ERROR = "Test not found";
const USER_NOT_FOUND_ERROR = 'User not found';
const INVALID_QUESTION_ERROR = "Invalid question";

export default class CorrectionService {
  private userODM: UserODM;
  private testODM: TestODM;

  constructor(odm: UserODM, testODM: TestODM) {
    this.userODM = odm;
    this.testODM = testODM;
  }

  public async createCorrection(userId: string, testId: string, questionsGiven: ICorrectionQuestion[]) {
    if (!isValidObjectId(userId) || !isValidObjectId(testId)) {
      throw new Error(INVALID_ERROR);
    }
    const user = await this.userODM.findById(userId);
    if (!user) {
      throw new Error(USER_NOT_FOUND_ERROR);
    }
    const test = await this.testODM.findById(testId);
    if (!test) {
      throw new Error(TEST_NOT_FOUND_ERROR);
    }
    const correct: IQuestion[] = [];
    const incorrect: IQuestion[] = [];
    questionsGiven.map((questionGiven) => {
      const { answerGiven, number }: ICorrectionQuestion = questionGiven;
      const question = test.questions.find((question) => question.number === number);
      if (!question) {
        throw new Error(INVALID_QUESTION_ERROR);
      }
      const { answers } = question;
      const correctAnswer = Object.keys(answers).find((key) => answers[key].correct);
      if (!correctAnswer) {
        throw new Error(INVALID_QUESTION_ERROR);
      }
      if (correctAnswer === answerGiven) {
        correct.push(question);
      } else {
        incorrect.push(question);
      }
    })
    const correction = {
      correct,
      incorrect,
      testId,
    }
    return correction;
  }
}