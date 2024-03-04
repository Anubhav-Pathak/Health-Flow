import {NextResponse} from "next/server";
import argon2 from "argon2";

import Doctor from "@/models/Doctor";
import connectDB from "@/utils/db";

export const POST = async (req) => {
    const {name, email, password, speciality, phone} = await req.json();
    try {
        await connectDB();
        const existingUser = await Doctor.findOne({name});
        if (existingUser) {
            return NextResponse.json({ message: "User already exists", status: 405 });
        }
        const hashedPassword = await argon2.hash(password);
        await new Doctor({name, email, hashedPassword, gender, speciality, phone}).save();
        return NextResponse.json({ message: "User created", status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error", status: 500});
    }
};