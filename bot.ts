import { createBot, startBot, CreateSlashApplicationCommand } from "./deps.ts";
import { Secret } from "./secret.ts";
import { allCommands } from "./commands/mod.ts";

const bot = createBot({
  token: Secret.DISCORD_TOKEN,
  events: {
    ready: (_bot, payload) => {
      console.log(`${payload.user.username} is ready!`);
    },
  },
});

await bot.helpers.upsertGlobalApplicationCommands(
  allCommands
    .map((c) => {
      if (c.metadata.trigger === "slash") {
        return c.metadata as CreateSlashApplicationCommand;
      } else {
        return undefined;
      }
    })
    .filter((c): c is CreateSlashApplicationCommand => c !== undefined)
);

bot.events.interactionCreate = async (b, interaction) => {
  // console.log(interaction);
  const data = interaction.data;

  const command = allCommands.find(
    (c) =>
      (c.metadata.trigger === "slash" && c.metadata.name === data?.name) ||
      (c.metadata.trigger === "effect" &&
        c.metadata.customId === data?.customId)
  );
  if (command === undefined) {
    return;
  } else {
    await command.action(b, interaction);
  }
};

await startBot(bot);
