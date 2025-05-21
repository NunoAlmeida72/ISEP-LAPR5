import { IRobotTypePersistence } from '../../dataschema/IRobotTypePersistence';
import mongoose from 'mongoose';

const RobotTypeSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    type: { type: String, unique: true },
    brand: {type: String, unique: false},
    model: {type: String, unique: false},
    possibleTasks: {type: Array<String>, unique: false},
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IRobotTypePersistence & mongoose.Document>('RobotType', RobotTypeSchema);
