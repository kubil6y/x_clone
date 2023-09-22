import { z } from "zod";
import prisma from "./prisma";
import bcryptjs from "bcryptjs";
import { createId } from "@paralleldrive/cuid2";
import { NextAuthOptions, Session, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET as string,
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                usernameOrEmail: {
                    label: "Credentials",
                    type: "text",
                    placeholder: "Enter your email or username",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, _req) {
                if (!credentials?.usernameOrEmail || !credentials.password) {
                    throw new Error("Invalid authentication credentials");
                }

                let whereQuery: { [k: string]: string };

                const isEmail = z
                    .object({ email: z.string().email() })
                    .safeParse({ email: credentials.usernameOrEmail });

                if (isEmail.success) {
                    whereQuery = { email: credentials.usernameOrEmail };
                } else {
                    whereQuery = { username: credentials.usernameOrEmail };
                }

                const user = await prisma.user.findFirst({ where: whereQuery });

                if (!user || !user?.hashedPassword) {
                    throw new Error("Invalid credentials");
                }

                const isPasswordValid = await bcryptjs.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isPasswordValid) {
                    throw new Error("Invalid credentials");
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    picture: user.image,
                };
            },
        }),
    ],
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
        async jwt({ token, user }) {
            const dbUser = await prisma.user.findFirst({
                where: {
                    email: token.email,
                },
            });

            if (!dbUser) {
                if (user) {
                    token.id = user?.id;
                }
                return token;
            }

            if (!dbUser.username) {
                await prisma.user.update({
                    where: {
                        id: dbUser.id,
                    },
                    data: {
                        username: createId(),
                    },
                });
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                username: dbUser.username,
                picture: dbUser.image,
            };
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }
            return session;
        },
    },
};

export function getAuthSession(): Promise<Session | null> {
    return getServerSession(authOptions);
}
