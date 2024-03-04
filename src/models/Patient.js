import {Schema, model} from 'mongoose';
import mongoose from 'mongoose';

const patientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
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