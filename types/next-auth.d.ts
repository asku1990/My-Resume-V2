import "next-auth";
import { UserType } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      type: UserType;
    }
  }

  interface User {
    id: string;
    username: string;
    type: UserType;
    tokenId: string;
  }

  interface JWT {
    id: string;
    username: string;
    type: UserType;
    userType: UserType;
    tokenId: string;
  }
}
