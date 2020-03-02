import jwt from 'jsonwebtoken';
import environment from './../environment';

export const retrieveUser = (token: string) => {
  try {
    if (token && environment.passwordDecripter) {
      return jwt.verify(token, environment.passwordDecripter);
    }
    return null;
  } catch (err) {
    return null;
  }
};
