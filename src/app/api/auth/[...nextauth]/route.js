import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/app/api/authService";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        try {
          const response = await loginUser({
            email: credentials.email,
            password: credentials.password,
            role: credentials.role,
            id: credentials.id,
          });

          if (response?.error) {
            throw new Error("Login failed in authorization");
          }
          return {
            id: response.user.id,
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
            accessToken: response.accessToken,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = { ...session.user, role: token.role, id: token.id };
        session.token = token.accessToken;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    encryption: false, // Disable encryption to use signed JWT
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };