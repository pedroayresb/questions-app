import Router from 'express';
import TestController from '../Controllers/Tests.controller';
import TestFactory from '../Factory/Tests.factory';
import validateToken from '../Validation/tokenValidation';

const router = Router();

const testFactory = TestFactory.create();

router
  .post('/', validateToken, async (req, res, next) => {
    const testController = new TestController(req, res, next, testFactory);
    await testController.create();
  })
  .get('/', async (req, res, next) => {
    const testController = new TestController(req, res, next, testFactory);
    await testController.getAll();
  })
  .get('/:id', async (req, res, next) => {
    const testController = new TestController(req, res, next, testFactory);
    await testController.findById();
  })
  .put('/:id', validateToken, async (req, res, next) => {
    const testController = new TestController(req, res, next, testFactory);
    await testController.updateById();
  })
  .delete('/:id', validateToken, async (req, res, next) => {
    const testController = new TestController(req, res, next, testFactory);
    await testController.deleteById();
  })
  .put('/:id/addQuestion', validateToken, async (req, res, next) => {
    const testController = new TestController(req, res, next, testFactory);
    await testController.addQuestion();
  })
  .put('/:id/removeQuestion', validateToken, async (req, res, next) => {
    const testController = new TestController(req, res, next, testFactory);
    await testController.removeQuestion();
  })
  .put('/:id/updateQuestion', validateToken, async (req, res, next) => {
    const testController = new TestController(req, res, next, testFactory);
    await testController.updateQuestion();
  });

export default router;