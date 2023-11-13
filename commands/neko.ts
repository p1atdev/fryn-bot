import { InteractionResponseTypes } from "../deps.ts";
import { CommandAction } from "../types/mod.ts";

const NekoCommand: CommandAction = {
  metadata: {
    trigger: "slash",
    name: "neko",
    description: "にゃーん",
  },
  action: async (b, interaction) => {
    await b.helpers.sendInteractionResponse(interaction.id, interaction.token, {
      type: InteractionResponseTypes.ChannelMessageWithSource,
      data: {
        content: "にゃーん",
      },
    });
  },
};

export default NekoCommand;
