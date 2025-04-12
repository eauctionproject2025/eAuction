import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/app/api/authService"; // Your login API function

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }
      },
      async authorize(credentials) {
        try {
          const response = await loginUser({
            email: credentials.email,
            password: credentials.password,
            role: credentials.role, 
          });
      
          if (response?.error) {
            throw new Error( "Login failed in authorization");
          }
            // console.log("user from authorization", response.user)
          return {
            id: response.user.id,
            name: response.user.name,
            email: response.user.email,
            role: response.user.role, // Pass the role
            // accessToken: response.accessToken,
          };
        } catch (error) {
          console.error("Authorization Error:", error.data, "Login failed in authorization 2");
          return null;
        }
      },
      
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = { ...session.user, role: token.role };
        session.token = token.accessToken;
        // console.log(session)
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
// console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
// console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET ? "Loaded" : "Not Loaded");

export { handler as GET, handler as POST };
