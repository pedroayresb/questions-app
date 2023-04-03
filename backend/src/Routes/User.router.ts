import { Router } from 'express';
import UserController from '../Controllers/User.controller';
import UserFactory from '../Factory/User.factory';
import validateToken from '../Validation/tokenValidation';
import { validateLoginUser, validateRegisterUser } from '../Validation/userValidation';

const router = Router();

const userFactory = UserFactory.create();

router
  .post('/register', validateRegisterUser, async (req, res, next) => {
    const userController = new UserController(req, res, next, userFactory);
    await userController.create();
  })
  .post('/login', validateLoginUser, async (req, res, next) => {
    const userController = new UserController(req, res, next, userFactory);
    await userController.login();
  })
  .get('/admin', validateToken, async (req, res, next) => {
    const userController = new UserController(req, res, next, userFactory);
    await userController.getAll();
  })
  .get('/:id', async (req, res, next) => {
    const userController = new UserController(req, res, next, userFactory);
    await userController.findById();
  })
  .put('/:id', validateToken, async (req, res, next) => {
    const userController = new UserController(req, res, next, userFactory);
    await userController.updateById();
  })
  .delete('/:id', validateToken, async (req, res, next) => {
    const userController = new UserController(req, res, next, userFactory);
    await userController.deleteById();
  });

export default router;