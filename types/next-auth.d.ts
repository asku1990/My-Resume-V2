import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email?: string;
    }
  }

  interface User {
    id: string;
    username: string;
  }

  interface JWT {
    id: string;
    username: string;
  }
}
