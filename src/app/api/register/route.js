import {NextResponse} from "next/server";
import argon2 from "argon2";
import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";
import qrcode from "qrcode";

import Doctor from "@/models/Doctor";
import Patient from "@/models/Patient";
import connectDB from "@/utils/db";

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.SENDGRID_API_KEY,
    }
}));

export const POST = async (req) => {
    const body = await req.json();
    if (body.isDoctor) {
        const {name, email, password, gender, speciality, phone} = body;
        try {
            await connectDB();
            const existingUser = await Doctor.findOne({email});
            if (existingUser) {

                return NextResponse.json({ message: "User already exists"}, {status: 409});
            }
            const hashedPassword = await argon2.hash(password);
            await new Doctor({name, email, password: hashedPassword, gender, speciality, phone}).save();
            const doctor = await Doctor.findOne({email})
            const qrBuffer = await qrcode.toBuffer(doctor._id.toString(), { type: 'png' });
            const mailOptions = {
                to: email,
                from: 'aryanraj2713@gmail.com',
                subject: 'OneHealth - QR Code Attachment',
                text: 'This email contains a QR code attachment. Please scan the QR code to access your account.',
                attachments: [
                    {
                        filename: 'qrcode.png',
                        content: qrBuffer,
                        contentType: 'image/png',
                    },
                ],
            };
            const response = await transporter.sendMail(mailOptions);
            console.log(response);
            return NextResponse.json({ message: "User Created !"}, {status: 201});
        } catch (error) {
            console.error(error);
            return NextResponse.json({ message: "Internal server error"}, {status: 500});
        }
    } else {
        const {name, aadharno, phone, p_contact} = body;
        try {
            await connectDB();
            const existingUser = await Patient.findOne({aadharno});
            if (existingUser) {
                return NextResponse.json({ message: "User already exists"}, {status: 409});
            }
            await new Patient({name, aadharno, phone, p_contact}).save();
            return NextResponse.json({ message: "User created"}, {status: 201});
        }
        catch (error) {
            console.log(error);
            return NextResponse.json({ message: "Internal server error"}, {status: 500});
        }
    }
    
};