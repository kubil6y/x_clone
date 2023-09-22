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
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
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
        jwt: async ({ token }) => {
            const dbUser = await prisma.user.findFirst({
                where: { email: token?.email },
            });

            if (dbUser) {
                token.id = dbUser.id;
                token.email = dbUser.email;
                token.username = dbUser.username;
                token.picture = dbUser.image;

                if (!dbUser?.username) {
                    await prisma.user.update({
                        where: {
                            id: dbUser?.id,
                        },
                        data: {
                            username: createId(),
                        },
                    });
                }
            }

            return token;
        },
        session: async ({ session, token }) => {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.username = token.username;
                session.user.email = token.email;
                session.user.image = token.picture;
            }
            return session;
        },
    },
    pages: {
        signIn: "/",
    },
};

export function getAuthSession(): Promise<Session | null> {
    return getServerSession(authOptions);
}
