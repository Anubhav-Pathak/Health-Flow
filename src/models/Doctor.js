import {Schema, model} from 'mongoose';
import mongoose from 'mongoose';

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    patients : [{
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }]
});

export default mongoose.models.Doctor ?? model('Doctor', doctorSchema);