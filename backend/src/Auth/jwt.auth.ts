import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const privateKey = fs.readFileSync(path.join(__dirname, '../../keys/private.key'), 'utf8');

const createToken = (payload: any): string => {
  const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
  return token;
}

export { privateKey, createToken };
