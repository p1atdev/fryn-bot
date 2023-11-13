import { InteractionResponseTypes, transformEmbed } from "../deps.ts";
import { FuruyoniClient } from "../furuyoni.ts";
import { CommandAction, FuruyoniTableDeleteReq } from "../types/mod.ts";
import { EmbedColor } from "../utils.ts";

const client = new FuruyoniClient();

interface EmbedField {
  value: string;
  name: string;
  inline?: boolean | undefined;
}

const TableDeleteCommand: CommandAction = {
  metadata: {
    trigger: "effect",
    customId: "delete",
  },
  action: async (b, interaction) => {
    const author = interaction.member;

    if (author?.user === undefined) {
      return;
    }

    const lastMessage = interaction.message;
    if (lastMessage === undefined) {
      return;
    }

    const lastEmbedsFields = lastMessage.embeds
      .map((embed) => embed.fields)
      .filter((fields): fields is EmbedField[] => fields !== undefined)
      .flat();

    const deleteReq: FuruyoniTableDeleteReq = {
      tableNo: client.parseKeyFromUrl(lastEmbedsFields[2].value),
      p1Key: client.parseKeyFromUrl(lastEmbedsFields[0].value),
      p2Key: client.parseKeyFromUrl(lastEmbedsFields[1].value),
      deleteKey: lastEmbedsFields[3].value,
      isGen2: true,
    };

    await b.helpers.sendInteractionResponse(interaction.id, interaction.token, {
      // 考え中...
      type: InteractionResponseTypes.DeferredChannelMessageWithSource,
    });

    console.log(`deleteReq: ${JSON.stringify(deleteReq)}`);

    console.log(`deleting table by ${author.user.username}`);
    await client.tableDelete(deleteReq);
    console.log(`deleted table by ${author.user.username}`);

    await b.helpers.editOriginalInteractionResponse(interaction.token, {
      content: "卓を削除しました",
      embeds: [
        transformEmbed(b, {
          fields: [
            {
              name: "削除完了",
              value: "卓は正常に削除されました",
            },
          ],
          timestamp: new Date().toISOString(),
          color: EmbedColor.green,
          footer: {
            text: `by ${author.nick ?? author.user.username}`,
            icon_url: b.helpers.getAvatarURL(
              author.id,
              author.user.discriminator,
              {
                avatar: author.avatar,
              }
            ),
          },
        }),
      ],
    });
  },
};

export default TableDeleteCommand;
