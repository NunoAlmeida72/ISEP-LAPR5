import { IElevatorPersistence } from "../../dataschema/IElevatorPersistence";
import mongoose from 'mongoose';

const elevatorSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        code: { type: String, unique: false },
        brand: { type: String, unique: false },
        model: { type: String, unique: false },
        serialNumber: { type: String, unique: false },
        description: { type: String, unique: false },
        buildingId: { type: String, unique: false },
        floorsIds: { type: Array, unique: false },
        posX:{type: Number,unique:false},
        posY:{type: Number,unique:false},
    },

    {
        timestamps: true
    }
);

export default mongoose.model<IElevatorPersistence & mongoose.Document>('Elevator', elevatorSchema);