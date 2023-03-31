import Router from 'express';
import CorrectionController from '../Controllers/Correction.controller';
import CorrectionFactory from '../Factory/Correction.factory';
import validateToken from '../Validation/tokenValidation';

const router = Router();

const correctionFactory = CorrectionFactory.create();

router
  .post('/', validateToken, async (req, res, next) => {
    const correctionController = new CorrectionController(req, res, next, correctionFactory);
    await correctionController.correction();
  });

export default router;
