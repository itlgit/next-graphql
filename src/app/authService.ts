import { signOut } from "next-auth/react";

export async function logout(): Promise<void> {
  return signOut();
}
