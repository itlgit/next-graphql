import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail } from '@/data/users';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60, // minutes
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: '' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = getUserByEmail(credentials?.email || '') || null;
        return user;
      },
    }),
  ],
  callbacks: {
    async redirect() {
      return '/dashboard';
    },
    async session({ session, token }) {
      session.user = getUserByEmail(session.user?.email || '') || undefined;
      return session;
    }
  },
});
export { handler as GET, handler as POST };
