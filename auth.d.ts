import "next-auth";

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    uid: string;
  }
}

declare module "next-auth" {
  interface User {
    _id: string; // Or string
  }
  interface Session {
    user: User;
    token: JWT;
  }
}
