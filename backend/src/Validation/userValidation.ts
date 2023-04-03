import { Request, Response, NextFunction } from 'express';

const validateRegisterUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, role } = req.body;
  if (!email || !password || !role || !name) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (role !== 'admin' && role !== 'user') {
    return res.status(400).json({ message: 'Invalid role' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'Invalid name' });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  next();
};

const validateLoginUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  next();
};

export { validateRegisterUser, validateLoginUser };
