import { CreateSlashApplicationCommand, Bot, Interaction } from "../deps.ts";

export interface SlashCommand extends CreateSlashApplicationCommand {
  trigger: "slash";
}

export interface EffectCommand {
  trigger: "effect";
  customId: string;
}

export interface CommandAction {
  metadata: SlashCommand | EffectCommand;
  action: (b: Bot, interaction: Interaction) => Promise<void>;
}
