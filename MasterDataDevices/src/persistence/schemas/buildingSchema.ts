import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';
import mongoose from 'mongoose';

const BuildingSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    code: { type: String, unique: true, maxLength: 5},
    name: { type:String, unique:false, maxLength:50},
    description: { type:String, unique:false },
    width: { type:Number, unique:false },
    depth: { type:Number, unique:false},
  }, 
  {
    timestamps: true
  }
);

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', BuildingSchema);