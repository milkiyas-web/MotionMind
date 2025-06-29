"use server";
import { validatedAction } from "@/lib/action-helpers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { z } from "zod";

const SignUpSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(4),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const signupEmail = validatedAction(SignUpSchema, async (data) => {
  const { email, password, name } = data;

  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Failed to create account" };
  }
});

export const loginEmail = validatedAction(LoginSchema, async (data) => {
  const { email, password } = data;

  try {
    await auth.api.signInEmail({
      body: { email, password },
    });
    return { success: true };
  } catch (error) {
    return { error: "Failed to sign in" };
  }
});
