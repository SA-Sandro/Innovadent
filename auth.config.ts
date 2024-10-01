import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth }) {
      const isLoggedIn = !!auth?.user;
      if (!isLoggedIn) return false;
      return true;
    },
    session: async ({ session, token, user }) => {
      if (token) {
        session.user.role = token.role as string;
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
};
