// src/app/pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import Doctor from '@/models/Doctor'
import connectDB from '@/utils/db'

import CredentialsProvider from "next-auth/providers/credentials";

const options = {
    providers: [
        CredentialsProvider({
            name: "Doctor",
            credentials: {
              username: { label: "Username", type: "email" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connectDB();
                const user = await Doctor.findOne({ email: credentials.email });
                if (user && user.password === credentials.password) {
                    return user;
                } else {
                    return null;
                }
            }
        }),
        CredentialsProvider({
            name: "Patient",
            credentials: {
              username: { label: "Username", type: "email" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connectDB();
                const user = await Patient.findOne({ email: credentials.email });
                if (user && user.password === credentials.password) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    secret: process.env.SECRET,
    session: {
        strategy: 'jwt',
    },
}

const handler = NextAuth(options)

export {handler as GET, handler as POST};
