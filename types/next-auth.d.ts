import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      organizationId: string;
      studentId?: string;
    } & DefaultSession['user'];
  }

  interface User {
    role: string;
    organizationId: string;
    studentId?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string;
    organizationId: string;
    studentId?: string;
  }
}
