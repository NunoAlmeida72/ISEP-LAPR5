import { IUserPersistence } from '../../dataschema/IUserPersistence';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    domainId: { 
      type: String,
      unique: true
    },

    firstName: {
      type: String,
      required: [true, 'Please enter first name'],
      index: true,
    },

    lastName: {
      type: String,
      required: [true, 'Please enter last name'],
      index: true,
    },

    email: {
      type: String,
      lowercase: true,  
      unique: true,
      index: true,
    },

    password: String,

    phoneNumber: {
      type: Number,
      required: [true, 'Please enter phone number'],
      unique: true,
      index: true,
    },

    nif: {
      type: Number,
      required: false,
      unique: true,
      index: true,
    },

    salt: String,

    role: {
      type: String,
      default: 'utente',
    },

    status: {
      type: String,
      required: [true, 'Please enter status'],
      index: true,
    },

    decisionDate: { 
      type: Date,
      required: false,
    },

    decisionUserId: { 
      type: String,
      required: false,
    },

    registrationDate: { 
      type: Date,
      required: false,
    },

  },
  { timestamps: true },
);

export default mongoose.model<IUserPersistence & mongoose.Document>('User', User);
