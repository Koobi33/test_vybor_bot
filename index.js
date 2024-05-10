import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import {
  selectLanguage,
  sendWelcomeMessage,
  sendHowToPlayMessage,
  sendStartDefaultMessages,
} from "./handlers.js";
import { CACHE } from "./shared.js";
import { WEB_APP_URL } from "./constants.js";
import { usersService } from "./api.js";

const MENU_BUTTON_RU = {
  type: "web_app",
  text: "🎮 Играть",
  web_app: {
    url: WEB_APP_URL,
  },
};
const MENU_BUTTON_EN = {
  type: "web_app",
  text: "🎮 Play",
  web_app: {
    url: WEB_APP_URL,
  },
};

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
  if (!CACHE[ctx.message.from.id]) {
    try {
      const user = usersService.getUserByTgId(ctx.message.from.id);
      if (user) {
        CACHE[ctx.update.callback_query.from.id] = user.locale;
        sendStartDefaultMessages(ctx);
      }
    } catch {
      selectLanguage(ctx);
    }
  } else {
    await sendStartDefaultMessages(ctx);
  }
});

bot.action("english", async (ctx) => {
  ctx.setChatMenuButton(MENU_BUTTON_EN);
  CACHE[ctx.update.callback_query.from.id] = "en";
  await usersService.createUser({
    name: ctx.update.callback_query.from.first_name,
    locale: "en",
    tg_id: ctx.update.callback_query.from.id,
  });
  ctx.deleteMessage(ctx.message_id);
  await sendStartDefaultMessages(ctx);
});

bot.action("russian", async (ctx) => {
  ctx.setChatMenuButton(MENU_BUTTON_RU);
  CACHE[ctx.update.callback_query.from.id] = "ru";
  await usersService.createUser({
    name: ctx.update.callback_query.from.first_name,
    locale: "ru",
    tg_id: ctx.update.callback_query.from.id,
  });
  ctx.deleteMessage(ctx.message_id);
  await sendStartDefaultMessages(ctx);
});

bot.command("howtoplay", (ctx) => {
  sendHowToPlayMessage(ctx);
});
bot.action("howtoplay", (ctx) => {
  sendHowToPlayMessage(ctx);
});

bot.command("menu", (ctx) => {
  sendWelcomeMessage(ctx);
});

bot.on(message("pinned_message"), (ctx) => ctx.deleteMessage(ctx.message_id));

bot.launch();
