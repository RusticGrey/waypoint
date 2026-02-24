import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      isAdmin: boolean;
      organizationId: string;
      studentId?: string;
    } & DefaultSession['user'];
  }

  interface User {
    role: string;
    isAdmin: boolean;
    organizationId: string;
    studentId?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string;
    isAdmin: boolean;
    organizationId: string;
    studentId?: string;
  }
}
