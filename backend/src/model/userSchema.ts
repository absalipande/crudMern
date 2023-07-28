import mongoose, { Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  age: number;
  email: string;
  gender: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    strict: true,
    strictQuery: true,
  }
);

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
