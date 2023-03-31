import TestODM from "../Database/Models/Tests.model";
import TestService from "../Services/Tests.services";

export default class TestFactory {
  public static create(): TestService {
    const testODM = new TestODM();
    return new TestService(testODM);
  }
}
