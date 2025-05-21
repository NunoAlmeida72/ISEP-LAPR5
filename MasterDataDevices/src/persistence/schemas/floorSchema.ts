import { IFloorPersistence } from '../../dataschema/IFloorPersistence';
import mongoose from 'mongoose';

const FloorSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    buildingId: { type: String, unique: false},
    number: { type: Number, unique: false},
    description: { type: String, unique: false },
    map: {type: Array<Array<Number>>, unique: false},
    initialPosition: {type: Array<Number>,unique: false},
    initialDirection: {type: Number, unique: false}
  }, 
  {
    timestamps: true
  }
);

export default mongoose.model<IFloorPersistence & mongoose.Document>('Floor', FloorSchema);