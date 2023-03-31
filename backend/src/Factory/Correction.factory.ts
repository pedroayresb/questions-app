import TestODM from "../Database/Models/Tests.model";
import UserODM from "../Database/Models/User.model";
import CorrectionService from "../Services/Correction.services";

export default class CorrectionFactory {
  public static create(): CorrectionService {
    const userODM = new UserODM();
    const testODM = new TestODM();
    const service = new CorrectionService(userODM, testODM);
    return service;
  }
}
