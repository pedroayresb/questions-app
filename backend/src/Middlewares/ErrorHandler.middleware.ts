import { NextFunction, Request, Response } from 'express';

class ErrorHandler {
  public static handle(
    error: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    switch (error.message) {
      case ("Invalid mongo id"):
        res.status(400).json({ message: error.message });
        break;
      case ("User not found"):
        res.status(404).json({ message: error.message });
        break;
      case ("Test not found"):
        res.status(404).json({ message: error.message });
        break;
      case ("Invalid question"):
        res.status(400).json({ message: error.message });
        break;
      case ("Missing required fields"):
        res.status(400).json({ message: error.message });
        break;
      case ("Invalid password"):
        res.status(400).json({ message: error.message });
        break;
      case ("Invalid email"):
        res.status(400).json({ message: error.message });
        break;
      default:
        console.log(error);
        res.status(500).json({ message: error.message });
    }
    return
  }
}

export default ErrorHandler;
