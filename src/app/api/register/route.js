import {NextResponse} from "next/server";
import argon2 from "argon2";

import Doctor from "@/models/Doctor";
import Patient from "@/models/Patient";
import connectDB from "@/utils/db";

export const POST = async (req) => {
    const body = await req.json();
    console.log(body);
    if (body.isDoctor) {
        const {name, email, password, gender, speciality, phone} = body;
        try {
            await connectDB();
            const existingUser = await Doctor.findOne({email});
            if (existingUser) {
                return NextResponse.json({ message: "User already exists", status: 405 });
            }
            const hashedPassword = await argon2.hash(password);
            await new Doctor({name, email, password: hashedPassword, gender, speciality, phone}).save();
            return NextResponse.json({ message: "User created", status: 201});
        } catch (error) {
            console.error(error);
            return NextResponse.json({ message: "Internal server error", status: 500});
        }
    } else {
        const {name, aadharno, phone, p_contact} = body;
        try {
            await connectDB();
            const existingUser = await Patient.findOne({aadharno});
            if (existingUser) {
                return NextResponse.json({ message: "User already exists", status: 405 });
            }
            await new Patient({name, aadharno, phone, p_contact}).save();
            return NextResponse.json({ message: "User created", status: 201});
        }
        catch (error) {
            console.log(error);
            return NextResponse.json({ message: "Internal server error", status: 500});
        }
    }
    
};