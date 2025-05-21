import { IBuildingConnectionPersistence } from '../../dataschema/IBuildingConnectionPersistence';
import mongoose from 'mongoose';

const BuildingConnectionSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    floor1Id: { type: String, unique: false },
    floor2Id: { type: String, unique: false },
    posXFloor1:{type: Number,unique:false},
    posYFloor1:{type: Number,unique:false},
    posXFloor2:{type: Number,unique:false},
    posYFloor2:{type: Number,unique:false},
  }, 
  {
    timestamps: true
  }
);

export default mongoose.model<IBuildingConnectionPersistence & mongoose.Document>('BuildingConnection', BuildingConnectionSchema);