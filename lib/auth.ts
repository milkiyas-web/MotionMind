import { betterAuth } from "better-auth";
import { config } from "dotenv";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db, authSchema } from "@/db/drizzle";
import { nextCookies } from "better-auth/next-js";

config({ path: ".env.local" }); // or .env.local
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),

  secret: process.env.BETTER_AUTH_SECRET!,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
});
