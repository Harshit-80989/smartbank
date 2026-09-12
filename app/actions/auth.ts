"use server";

import { signOut, signIn } from "@/auth";

export async function login() {
  await signIn("google");
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}