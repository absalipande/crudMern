import { IUser } from '../model/userSchema';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
