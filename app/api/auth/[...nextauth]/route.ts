import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient, UserType } from "@prisma/client";
import bcrypt from "bcryptjs";
import { auditUserLogin, auditFailedLoginAttempt, auditUserLogout } from "@/app/actions/audit";
import { headers } from 'next/headers';
import crypto from 'crypto';

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!user) {
          await auditFailedLoginAttempt(credentials.username, {
            reason: "User not found"
          });
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          await auditFailedLoginAttempt(credentials.username, {
            reason: "Invalid password"
          });
          return null;
        }

        // Update last login time
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() },
        });

        // Generate token information
        const headersList = headers();
        const userAgent = headersList.get('user-agent');
        const ip = headersList.get('x-forwarded-for') || 'unknown';
        const tokenId = crypto.randomUUID();
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

        // Create login audit log with token metadata
        await auditUserLogin(user.id, true, {
          tokenId,
          expiresAt,
          isRevoked: false,
          userAgent,
          ipAddress: ip
        });

        return {
          id: user.id,
          username: user.username,
          type: user.type,
          tokenId,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.userType = user.type;
        token.tokenId = user.tokenId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.type = token.type as UserType;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
  events: {
    async signOut({ token }) {
      if (token?.id && token?.tokenId) {
        // Log the logout with token revocation
        await auditUserLogout(token.id as string, {
          tokenId: token.tokenId,
          isRevoked: true,
          revokedAt: new Date()
        });
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
