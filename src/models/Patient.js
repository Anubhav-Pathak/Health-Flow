import {Schema, model} from 'mongoose';
import mongoose from 'mongoose';

const patientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    aadharno: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    p_contact: {
        type: String,
        required: true
    },
    medicalRecords: [
        {
            type: String,
        }
    ],    
    createdAt: {
        type: Date,
        default: Date.now
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    disease: [{type: String}]
});

export default mongoose.models.Patient ?? model('Doctor', doctorSchema);