import jwt from 'jsonwebtoken';
import environment from './../environment';
import { JWTResponse } from './../main.d';

export const retrieveUser = (token: string) => {
  try {
    if (token && environment.passwordDecripter) {
      const result = jwt.verify(token, environment.passwordDecripter);
      if (!result) {
        throw new Error('connexion not available');
      }
      return result as JWTResponse;
    }
    return null;
  } catch (err) {
    return null;
  }
};

export const dateToString = (date: string) => {
  return new Date(date).toDateString();
};
