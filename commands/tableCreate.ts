import {
  InteractionResponseTypes,
  transformEmbed,
  MessageComponentTypes,
  ButtonStyles,
} from "../deps.ts";
import { FuruyoniClient } from "../furuyoni.ts";
import { CommandAction } from "../types/mod.ts";
import { EmbedColor } from "../utils.ts";

const client = new FuruyoniClient();

const TableCreateCommand: CommandAction = {
  metadata: {
    trigger: "slash",
    name: "create",
    description: "新しく卓を作成します",
  },
  action: async (b, interaction) => {
    const author = interaction.member;

    if (author?.user === undefined) {
      return;
    }

    console.log(`creating table by ${author.user.username}`);

    const res = await client.tableCreate();

    console.log(`table created: ${JSON.stringify(res)}`);

    await b.helpers.sendInteractionResponse(interaction.id, interaction.token, {
      type: InteractionResponseTypes.ChannelMessageWithSource,
      data: {
        content: "卓を作成しました",
        embeds: [
          transformEmbed(b, {
            fields: [
              {
                name: "プレイヤー1の参加用URL",
                value: res.p1Url,
              },
              {
                name: "プレイヤー2の参加用URL",
                value: res.p2Url,
              },
              {
                name: "観戦用URL",
                value: res.watchUrl,
              },
              {
                name: "削除キー",
                value: res.deleteKey,
              },
            ],
            timestamp: new Date().toISOString(),
            color: EmbedColor.green,
            footer: {
              text: `by ${author.nick ?? author.user.username}`,
              icon_url: b.helpers.getAvatarURL(
                author.user.id,
                author.user.discriminator,
                {
                  avatar: author.avatar,
                }
              ),
            },
          }),
        ],
        components: [
          {
            type: MessageComponentTypes.ActionRow,
            components: [
              {
                type: MessageComponentTypes.Button,
                label: "削除する",
                style: ButtonStyles.Secondary,
                customId: "delete",
                emoji: {
                  name: "❌",
                },
              },
            ],
          },
        ],
      },
    });
  },
};

export default TableCreateCommand;
