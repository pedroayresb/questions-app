import { NextFunction, Request, Response } from "express";
import CorrectionService from "../Services/Correction.services";

export default class CorrectionController {
  private correctionService: CorrectionService;
  private req: Request;
  private res: Response;
  private next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction, correctionService: CorrectionService) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.correctionService = correctionService;
  }

  public async correction() {
    const { locals: { user } } = this.res;
    const { testId, questionsGiven } = this.req.body;
    const userId = user._id;
    try {
      const correction = await this.correctionService.createCorrection(userId, testId, questionsGiven);
      this.res.status(200).json(correction);
    } catch (error) {
      this.next(error);
    }
  }
}
