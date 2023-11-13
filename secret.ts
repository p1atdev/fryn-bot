import { dotenv } from "./deps.ts";

await dotenv.load({
  export: true,
  defaultsPath: "./.env.local",
});

export const Secret = {
  DISCORD_TOKEN: Deno.env.get("DISCORD_TOKEN")!,
};
