import ICorrectionQuestion from './Correction.interfaces';

interface ICorrectionBody {
  testId: string;
  questionsGiven: ICorrectionQuestion[];
  userId: string;
}